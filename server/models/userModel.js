const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String },
  name: { type: String },
  orders: [{
    order_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Order"},
  }],
  groups: [{
    group_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Group"},
    is_admin: { type: Boolean, default: false },
  }],
  organizations: [{
    organization_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Organization"},
    is_admin: { type: Boolean, default: false },
  }],
  workbooks: [{
    workbook_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Workbook"},
    overall_progress: { type: Number },
    items: [{
      item_id:  {type: mongoose.Schema.Types.ObjectId, ref:"WorkbookItem"},
      user_item_id:  {type: mongoose.Schema.Types.ObjectId, ref:"UserWorkbookItem"},
      title: { type: String }, //redundant title to speed up calls
    }],
  }]
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;
