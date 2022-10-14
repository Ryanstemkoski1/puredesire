const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  price: { type: Number },
  workbook: {
    workbook_id: {type: mongoose.Schema.Types.ObjectId, ref: "Workbook"},
    title: { type: String }, //redundant title to speed up calls
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
