const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs')

const WorkbookItem = require("../models/workbookItemsModel");
const Workbook = require('../models/workbookModel');

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

    const itemContent = new WorkbookItem(req.body);
    const result = await itemContent.save();

    // const results = await Workbook.updateOne(
    //   {
    //     "sections": { "$elemMatch": { "_id": mongoose.Types.ObjectId(sectionid) } }
    //   },
    //   {
    //     $push: {
    //       'sections.$.items': {
    //         title: title,
    //         item_id: result._id,
    //       }
    //     }
    //   },
    //   {
    //     new: true
    //   }
    // )

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
  const result = await WorkbookItem.findByIdAndUpdate(req.params.id, req.body, { new: true })

  // const results = await Workbook.updateOne(
  //   {
  //     "sections": { "$elemMatch": { "items": { "$elemMatch": { "item_id": mongoose.Types.ObjectId(result._id) } } } }
  //   },
  //   {
  //     $set: {
  //       "sections.$.items.$[t].title": result.title
  //     }
  //   },
  //   {
  //     arrayFilters: [{ "t.item_id": mongoose.Types.ObjectId(result._id) }]
  //   }
  // )
  res.send({ success: 'WorkbookItem updated successfully.' });
})


//Update WorkBookItem Order
router.put("/update-itemorder", async (req, res) => {
  await WorkbookItem.findByIdAndUpdate(
    req.body[0]._id,
    {
      title: req.body[1].title,
      type: req.body[1].type,
      description: req.body[1].description,
      content: req.body[1].content,
      priority: req.body[1].priority,
      required_score: req.body[1].required_score,
      questions: req.body[1].questions
    },
    {
      new: true
    }
  )
  await WorkbookItem.findByIdAndUpdate(
    req.body[1]._id,
    {
      title: req.body[0].title,
      type: req.body[0].type,
      description: req.body[0].description,
      content: req.body[0].content,
      priority: req.body[0].priority,
      required_score: req.body[0].required_score,
      questions: req.body[0].questions
    },
    {
      new: true
    }
  )
  res.status(200).json({ success: true })
})

// Delete WorkbookItem
router.delete("/delete-workbookitem/:id", async (req, res, next) => {
  const result = await WorkbookItem.deleteOne({ _id: req.params.id });

  // const results = await Workbook.updateOne(
  //   {
  //     "sections": { "$elemMatch": { "items": { "$elemMatch": { "item_id": mongoose.Types.ObjectId(result._id) } } } }
  //   },
  //   {
  //     $pull: {
  //       "sections.$.items.$[].item_id": mongoose.Types.ObjectId(req.params.id)
  //     }
  //   }
  // )

  res.send({ success: 'WorkbookItem was deleted successfully.' });
});
module.exports = router;
