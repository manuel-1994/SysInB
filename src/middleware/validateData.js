const {users,clients,providers,products} = require("../libs/joi");

const methods = {
  user: (req,res,next) => validateData(users, req,res,next),
  client:(req,res,next) =>validateData(clients, req,res,next),
  provider: (req,res,next) =>validateData(providers, req,res,next),
  product: (req,res,next) =>validateData(products, req, res, next)
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