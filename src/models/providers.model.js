const {mongoose} = require('../config/db');
const {Schema} = mongoose;

const providersSchmea = new Schema({
  name: String,
  address: String,
  email: String,
  phoneNumber: Number
});

const ProvidersModel = mongoose.model('providers', providersSchmea);

module.exports = ProvidersModel