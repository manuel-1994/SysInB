const ProvidersModel = require("../models/providers.model");

class Providers{
  async getAllProviders(){
    return await ProvidersModel.find()
  }
  async getProvider({email, _id}){
    return await ProvidersModel.findOne(email?{email}:{_id})
  }
  async createProvider(data){
    const newProvider = await ProvidersModel.create(data)
    return {data:newProvider, success:true, message: "Proveedor creado exitosamente"}
  }
  async updateProvider(id,data){
    const updateProvider = await ProvidersModel.findByIdAndUpdate(id,data,{new:true})
    return {data:updateProvider, success:true, message: "Proveedor actualizado exitosamente"}
  }
  async deleteProvider(id){
    const deleteProvider = await ProvidersModel.findByIdAndDelete(id)
    return {data: deleteProvider, success:true, message: "Proveedor eliminado exitosamente"}
  }
}

module.exports = Providers