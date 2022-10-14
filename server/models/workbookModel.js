const mongoose = require("mongoose");


const workbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  parent_workbook: { type: mongoose.Schema.Types.ObjectId, ref: "Workbook" },
  description: { type: String },
  colorMain: { type: String },
  colorLightShade: { type: String },
  colorDarkShade: { type: String },
  colorBackground: { type: String },
  language: { type: String },
  sku: { type: String },
  scoring: { type: Boolean, default: false },
  file_cover: { type: String },
  file_header: { type: String },
  sections: [{
    title: { type: String, required: true },
    description: { type: String },
    s_header_image: { type: String },
    s_pdf_download: { type: String },
    priority: { type: Number },
    items: [{
      title: { type: String, required: true }, //redundant title to speed up lookups
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: "workbookItems" },
    }]
  }],
}, { timestamps: true });

const Workbook = mongoose.model("Workbook", workbookSchema);

module.exports = Workbook;
