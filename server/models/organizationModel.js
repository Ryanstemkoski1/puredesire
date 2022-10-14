const mongoose = require("mongoose");


const organizationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  special_distinction: { type: String },
  description: { type: String },
  location: { type: String },
  meeting_date: { type: String },
  meetings: [{
    start: { type: Date },
    end: { type: Date },
    location: { type: String },
  }],
  workbooks: [{
    workbook_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Workbook" }
  }]
}, { timestamps: true });

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
