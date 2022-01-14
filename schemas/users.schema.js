const {mongoose} = require('../config/db'); 
const {Schema} = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  rol: {
    type: String,
    default: 'regular'
  }
});

module.exports = {
  userSchema
};