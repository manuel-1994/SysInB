const UserModel = require("../models/users.model");

class Users {
  async getAllData() {
    return await UserModel.find();
  };

  async getData({username,email,_id}){
      return await UserModel.findOne(username?{username}:email?{email}:{_id}).exec()
  };

  async createData(data){
    const newUser = await UserModel.create(data);
    return {data:newUser, success:true, message: `Usuario creado exitosamente`}
  };

  async updateData(id,data){
      const userUpdate = await UserModel.findByIdAndUpdate(id, data);
      return {data:userUpdate, success:true, message: 'Usuario actualizado exitosamente'}
  };

  async deleteData(id){
    const userDelete = await UserModel.findByIdAndDelete(id);
    return {data:userDelete, success:true, message: 'Usuario eliminado exitosamente'}
  };
}

module.exports = Users;