const ClientsModel = require("../models/clients.model");

class Clients{
  async getAllData(){
    return await ClientsModel.find()
  }
  async getData({email, _id}){
    return await ClientsModel.findOne(email?{email}:{_id})
  }
  async createData(data){
    const newClient = await ClientsModel.create(data)
    return {data:newClient, success:true, message: "Cliente creado exitosamente"}
  }
  async updateData(id,data){
    const updatedClient = await ClientsModel.findByIdAndUpdate(id,data,{new:true})
    return {data:updatedClient, success:true, message: "Cliente actualizado exitosamente"}
  }
  async deleteData(id){
    const deletedClient = await ClientsModel.findByIdAndDelete(id)
    return {data: deletedClient, success:true, message: "Cliente eliminado exitosamente"}
  }
}

module.exports = Clients