const Joi = require('joi')

const providersSchemaJoi = Joi.object({
  name: Joi.string().max(30).message('Maximo 30 caracteres'),
  address: Joi.string().max(20).message('Maximo 20 caracteres'),
  email: Joi.string().email().required().max(254).message('Maximo 254 caracteres'),
  phoneNumber: Joi.number().min(12)
});

module.exports = providersSchemaJoi;