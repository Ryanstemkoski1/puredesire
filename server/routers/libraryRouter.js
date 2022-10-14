const express = require('express');
const router = express.Router();
const Workbook = require("../models/workbookModel");


router.get("/", (req, res) => {
  Workbook.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
