const {mongoose} = require('../config/db')
const {Schema} = mongoose;

const usersSchema = new Schema({
  username: String,
  email: String,
  password: String,
  rol: {
    type: String,
    default: 'regular'
  }
});

// User model
const UsersModel = mongoose.model('Users', usersSchema);

module.exports = UsersModel;
