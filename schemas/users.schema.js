const Joi = require('joi')
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

const userSchemaJoi = Joi.object({
  username: Joi.string().required().max(30).message('Maximo 30 caracteres'),
  email: Joi.string().email().required().max(254).message('Maximo 254 caracteres'),
  password: Joi.string().alphanum().required().min(8).message('Debe contener minimo 8 caracteres')
});

module.exports = {
  userSchema,
  userSchemaJoi
};