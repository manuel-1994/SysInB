const {mongoose} = require('../config/db')
const {userSchema} = require('../schemas/users.schema');

// User model
const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
