const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const mongoose = require("mongoose");

// Workbook Model
const Workbook = require("../models/workbookModel");

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

// CREATE Workbook
router.post("/create-workbook", upload.fields([{ name: 'file_cover', maxCount: 1 }, { name: 'file_header', maxCount: 1 }]), async (req, res, next) => {
    try {
        const { title, sku, scoring, description, colorMain, colorLightShade, colorDarkShade, colorBackground } = req.body;
        var file_cover = '';
        var file_header = '';
        if (req.files['file_cover']) {
            file_cover = req.files['file_cover'][0].path;
        }
        if (req.files['file_header']) {
            file_header = req.files['file_header'][0].path;
        }
        const WorkbookItem = new Workbook({
            title,
            sku,
            scoring,
            description,
            colorMain,
            colorLightShade,
            colorDarkShade,
            colorBackground,
            file_cover,
            file_header
        });
        const result = await WorkbookItem.save();
        res.send({ success: 'Workbook created successfully.', workbookId: result._id });
    } catch (error) {
        res.status(400).send('Error while creating the workbook. Try again later.');
    }
});

// Upload files
router.post('/uploads', upload.fields([{ name: 's_header_image', maxCount: 1 }, { name: 's_pdf_download', maxCount: 1 }]), async (req, res) => {
    try {
        var s_header_image = '';
        var s_pdf_download = '';
        if (req.files['s_header_image']) {
            s_header_image = req.files['s_header_image'][0].path;
        }
        if (req.files['s_pdf_download']) {
            s_pdf_download = req.files['s_pdf_download'][0].path;
        }
        res.json({ s_header_image: s_header_image, s_pdf_download: s_pdf_download })
    } catch (err) {
        res.status(400).send(err);
    }
})

// Delete files 
router.post('/delete', (req, res) => {
    try {
        path = req.body.path
        fs.unlinkSync(path)
        res.json({ success: "success" })
    } catch (err) {
        res.status(400).send(err);
    }
})

//Add Section
router
    .route("/add-section/:id")
    .put((req, res) => {
        Workbook.findByIdAndUpdate(
            req.params.id,
            {
                $push: req.body,
            },
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
        );
    })

// Update Section
router.put("/delete-section/:id",
    (req, res, next) => {
        Workbook.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { 'sections': { _id: req.body._id } }
            },
            {
                new: true
            },
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.status(200).json({
                        msg: data,
                    });
                }
            }
        );
    });

router.put("/update-section/:id",
    (req, res, next) => {
        Workbook.updateOne(
            {
                "sections": { "$elemMatch": { "_id": mongoose.Types.ObjectId(req.body.sections[0]._id) } }
            },
            {
                $set: {
                    "sections.$.title": req.body.sections[0].title,
                    'sections.$.description': req.body.sections[0].description
                }
            },
            {
                new: true
            },
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.status(200).json({
                        msg: data,
                    });
                }
            }
        );

    });

// READ Workbooks
router.get("/", (req, res) => {
    Workbook.find((error, data, next) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// READ Workbooks By ID
router.get("/:id", (req, res) => {
    Workbook.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});


// UPDATE workbook
router
    .route("/update-workbook/:id")
    // Get Single Workbook
    .get((req, res) => {
        Workbook.findById(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
    })

    // Update Workbook Data
    .put((req, res, next) => {
        Workbook.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
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
        );
    });

// Delete Workbook
router.delete("/delete-workbook/:id",
    (req, res, next) => {
        Workbook.findByIdAndUpdate(
            req.params.id, (error, data) => {
                if (error) {
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
