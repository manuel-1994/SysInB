const UserModel = require("../models/users.model");

class Users {
  async getUsers() {
    const users = await UserModel.find();
    return users;
  };

  async getUser({username,email,_id}){
    const user = await UserModel.findOne(username?{username}:email?{email}:{_id}).exec();
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
    return {data:userDelete, success:true, message: 'Usuario eliminado exitosamente'}
  };
}

module.exports = Users;