const UserModel = require("../models/user.model");

class Users {
  async getUsers() {
    const user = await UserModel.find();
    return user;
  };

  async createUser(data){
    const newUser = await UserModel.create(data);
    return newUser;
  };

  async updateUser(id,data){
    const userUpdate = await UserModel.findByIdAndUpdate(id, data);
    return userUpdate;
  };

  async deleteUser(id){
    const userDelete = await UserModel.findByIdAndDelete(id);
    return userDelete;
  };
}

module.exports = Users;