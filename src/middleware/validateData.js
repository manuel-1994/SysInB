const { 
  usersSchemaJoi, 
  clientsSchemaJoi, 
  providersSchemaJoi, 
  productsSchemaJoi 
} = require("../schemas");

const methods = {
  user: (req,res,next) => validateData(usersSchemaJoi, req,res,next),
  client:(req,res,next) =>validateData(clientsSchemaJoi, req,res,next),
  provider: (req,res,next) =>validateData(providersSchemaJoi, req,res,next),
  product: (req,res,next) =>validateData(productsSchemaJoi, req, res, next)
}

const validateData = (data,req,res,next) =>{
    const validateData = data.validate(req.body);
    if(validateData.error){
      return res.status(400).json({
        success:false, 
        message: validateData.error.details[0].message});
    };
    return next();
}

module.exports = methods;