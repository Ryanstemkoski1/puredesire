const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  woocommerce_id: { type: String },
  total: { type: Number },
  billing_name: { type: String },
  billing_address: { type: String },
  billing_address2: { type: String },
  billing_city: { type: String },
  billing_state: { type: String },
  billing_zip: { type: String },
  order_date: { type: Date, default: Date.now },
  items:[{
    product_id:  {type: mongoose.Schema.Types.ObjectId, ref:"Product"},
    qty: { type: Number },
    price: { type: Number },
  }]
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
