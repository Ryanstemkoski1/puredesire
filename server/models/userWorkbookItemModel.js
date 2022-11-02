const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  signups:[{
    signupDate: {type: Date, default: Date.now, required: true},
    user_id:  {type: mongoose.Schema.Types.ObjectId, ref:"User"},
  }],
  counter: {type: Number, required: true}
});

const userWorkbookItemSchema = new mongoose.Schema({
  item_id:  {type: mongoose.Schema.Types.ObjectId, ref:"WorkbookItem"},
  progress: { type: Number },
  content: { type: String },
  total: { type: Number },
  date_complete: { type: Date, default: Date.now },
  questions:[{
    question_id:  {type: mongoose.Schema.Types.ObjectId, ref:"WorkbookItem.questions"},
    title: { type: String, required: true },
    type: { type: String },
    priority: { type: Number },
    points: { type: Number },
    options:[{
      title: { type: String, required: true },
      value: { type: String, required: true },
      priority: { type: Number },
      points: { type: Number },
    }],
    answers:[{
      content: { type: String }, //for options just set to match value
      date_answered: { type: Date, default: Date.now },
    }],
  }],
}, { timestamps: true });

const UserWorkbookItem = mongoose.model("UserWorkbookItem", userWorkbookItemSchema);

module.exports = UserWorkbookItem;
