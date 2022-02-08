const Joi = require('joi')

const schemas = {
  users: Joi.object({
    username: Joi.string().required().max(30).message('Maximo 30 caracteres'),
    email: Joi.string().email().required().max(254).message('Maximo 254 caracteres'),
    password: Joi.string().alphanum().required().min(8).message('Debe contener minimo 8 caracteres')
  }),

  clients: Joi.object({
    firstName: Joi.string().max(30).message('Maximo 30 caracteres'),
    lastName: Joi.string().max(30).message('Maximo 30 caracteres'),
    address: Joi.string().max(20).message('Maximo 20 caracteres'),
    email: Joi.string().email().required().max(254).message('Maximo 254 caracteres'),
    phoneNumber: Joi.number().min(12)
  }),

  providers: Joi.object({
    name: Joi.string().max(30).message('Maximo 30 caracteres'),
    address: Joi.string().max(20).message('Maximo 20 caracteres'),
    email: Joi.string().email().required().max(254).message('Maximo 254 caracteres'),
    phoneNumber: Joi.number().min(12)
  }),

  products: Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required()
  })
}

module.exports= schemas