const ProvidersModel = require("../models/providers.model");

class Providers{
  async getAllData(){
    return await ProvidersModel.find()
  }
  async getData({email, _id}){
    return await ProvidersModel.findOne(email?{email}:{_id})
  }
  async createData(data){
    const newProvider = await ProvidersModel.create(data)
    return {data:newProvider, success:true, message: "Proveedor creado exitosamente"}
  }
  async updateData(id,data){
    const updateProvider = await ProvidersModel.findByIdAndUpdate(id,data,{new:true})
    return {data:updateProvider, success:true, message: "Proveedor actualizado exitosamente"}
  }
  async deleteData(id){
    const deleteProvider = await ProvidersModel.findByIdAndDelete(id)
    return {data: deleteProvider, success:true, message: "Proveedor eliminado exitosamente"}
  }
}

module.exports = Providers