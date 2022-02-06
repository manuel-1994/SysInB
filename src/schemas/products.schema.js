const Joi = require('joi');

const productsSchemaJoi = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required()
});

module.exports = productsSchemaJoi;