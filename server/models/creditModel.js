const mongoose = require("mongoose");


const creditSchema = new mongoose.Schema({
  workbook_id: {type: mongoose.Schema.Types.ObjectId, ref:"Workbook"},
  owner: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
  purchased_by: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
  order_item: {type: mongoose.Schema.Types.ObjectId, ref:"User.orders.items"},
  redemption_code: { type: String },
  redemption_expires: { type: Date },
  activated_at: { type: Date },
}, { timestamps: true });

const Credit = mongoose.model("Credit", creditSchema);

module.exports = Credit;
