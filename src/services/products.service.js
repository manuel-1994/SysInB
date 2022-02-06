const ProductsModel = require("../models/products.model");

class Products {
  async getAllData(query){
    const data = await ProductsModel.find({...query})
    return (data.length > 1)
    ?{data, success:true}
    :{data:Object.assign(...data), success:true}
  }
  async getData({name,code,_id}){
    return await ProductsModel.findOne(name?{name}:code?{code}:{_id}).exec();
  }
  async createData(data){
    const product = await ProductsModel.create(data);
    return {data: product, success: true, message: 'Producto creado exitosamente'}
  }
  async updateData(id, data){
    const product = await ProductsModel.findByIdAndUpdate(id,data, {new:true});
    return {data: product, success: true, message: 'Producto actualizado exitosamente'}
  }
  async deleteData(id){
    const product = await ProductsModel.findByIdAndDelete(id);
    return {data: product, success: true, message: 'Producto eliminado exitosamente'}
  }
}

module.exports = Products;