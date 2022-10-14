const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  group_leader: {type: mongoose.Schema.Types.ObjectId, ref:"User" },
  special_distinction: { type: String },
  description: { type: String },
  location: { type: String },
  meeting_date: { type: String },
  meetings: [{
    meeting_id:  {type: mongoose.Schema.Types.ObjectId, ref:"GroupMeeting" }
  }],
  workbooks: [{
    workbook_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Workbook" }
  }]
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
