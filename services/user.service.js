const UserModel = require("../models/user.model");

class Users {
  async getUsers() {
    const users = await UserModel.find();
    return users;
  };

  async getUser({username,email}){
    const user = await UserModel.findOne(username?{username}:{email}).exec();
    return user;
  };

  async createUser(data){
    const newUser = await UserModel.create(data);
    return {data:newUser, success:true, message: `Usuario creado exitosamente`}
  };

  async updateUser(id,data){
      const userUpdate = await UserModel.findByIdAndUpdate(id, data);
      return {data:userUpdate, success:true, message: 'Usuario actualizado exitosamente'}
  };

  async deleteUser(id){
    const userDelete = await UserModel.findByIdAndDelete(id);
    return userDelete;
  };
}

module.exports = Users;