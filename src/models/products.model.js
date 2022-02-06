const { mongoose } = require("../config/db");

const {Schema} = mongoose;

const productsSchema = new Schema({
  code: String,
  name: String,
  category: String,
  quantity: Number,
  price: Number
});

const ProductsModel = mongoose.model('products', productsSchema);

module.exports = ProductsModel;