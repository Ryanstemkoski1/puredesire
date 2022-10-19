const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs')

const WorkbookItem = require("../models/workbookItemsModel");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

// CREATE WorkbookItems
router.post("/create-workbookItem", async (req, res) => {
  try {
    const { title, type, description, content, workbookid, sectionid } = req.body

    const itemContent = new WorkbookItem({
      title,
      type,
      description,
      content,
      workbookid,
      sectionid
    });
    const result = await itemContent.save();

    res.send({ success: 'WorkbookItem created successfully.' });
  } catch (err) {
    res.status(400).send('Error while creating the workbook. Try again later.');
  }
})

// Upload Images
router.post("/uploads", upload.fields([{ name: 'image', maxCount: 1 },]), async (req, res) => {
  try {
    var image = '';
    if (req.files['image']) {
      image = req.files['image'][0].path;
    }
    res.json({ imageurl: image })
  } catch (err) {
    res.status(400).send(err);
  }
})


//GET WorkbookItems
router.get("/:id", async (req, res) => {
  WorkbookItem.find({ sectionid: req.params.id }, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
})

//Update WorkBookItems
router.put("/update-workbookitem/:id", async (req, res, next) => {
  WorkbookItem.findOneAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Workbook updated successfully !");
      }
    }
  )
})

// Delete WorkbookItem
router.delete("/delete-workbookitem/:id",
  (req, res, next) => {
    WorkbookItem.deleteOne(
      { _id: req.params.id }, (error, data) => {
        if (error) {
          console.log(error)
          return next(error);
        } else {

          res.status(200).json({
            msg: data,
          });
        }
      }
    );
  });
module.exports = router;
