const {userSchemaJoi} = require('../schemas/users.schema')
const validateData = (data,req,res,next) =>{
    const validateData = data.validate(req.body);
    if(validateData.error){
      return res.status(400).json({
        data:validateData.value, 
        success:false, 
        message: validateData.error.details[0].message});
    };
    return next();
}

const user = (req,res,next) =>{
  validateData(userSchemaJoi, req,res,next)
}

const client = (req,res,next) =>{
}

const provider = (req,res,next) =>{
}

module.exports = {
  user,
  client,
  provider
}