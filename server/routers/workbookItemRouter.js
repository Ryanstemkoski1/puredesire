const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const WorkbookItem = require("../models/workbookItemsModel");

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


module.exports = router;
