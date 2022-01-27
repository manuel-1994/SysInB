const {mongoose} = require('../config/db')
const {Schema} = mongoose

const clientsSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  phoneNumber: Number
})


const ClientsModel = mongoose.model('clients', clientsSchema)

module.exports = ClientsModel