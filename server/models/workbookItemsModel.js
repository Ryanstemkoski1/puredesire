const mongoose = require("mongoose");


const workbookItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String },
    content: { type: String },
    priority: { type: Number },
    required_score: { type: Number },
    questions:[{
      title: { type: String, required: true },
      type: { type: String },
      priority: { type: Number },
      points: { type: Number },
      options:[{
        title: { type: String, required: true },
        priority: { type: Number },
        points: { type: Number },
      }]
  }],
}, { timestamps: true });

const WorkbookItem = mongoose.model("WorkbookItem", workbookItemSchema);

module.exports = WorkbookItem;
