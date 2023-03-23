const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Schema (the structure of the product)
const productSchema = new Schema({
  id_product: Number,
  name_product: String,
  description: String,
});

// Create a model based on that schema
const Product = mongoose.model('product', productSchema);

// export the model
module.exports = Product;
