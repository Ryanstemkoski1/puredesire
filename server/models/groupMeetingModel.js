const mongoose = require("mongoose");


const groupMeetingSchema = new mongoose.Schema({
  start: { type: Date },
  end: { type: Date },
  location: { type: String },
}, { timestamps: true });

const GroupMeeting = mongoose.model("GroupMeeting", groupMeetingSchema);

module.exports = GroupMeeting;
