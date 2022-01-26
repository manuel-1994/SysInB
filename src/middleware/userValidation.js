const { userSchemaJoi } = require("../schemas/users.schema");
const Users = require("../services/users.service");

const validateUser = async (isFullValidation,req,res,next) =>{
    const userValidation= userSchemaJoi.validate(req.body);
    if(userValidation.error){
      return res.status(400).json({
        data:userValidation.value, 
        success:false, 
        message: userValidation.error.details[0].message});
    };

    if(isFullValidation){
      const userService = new Users();
      const userExist = await userService.getUser({username:req.body.username});
      if(userExist){
        return res.status(400).json({
          data:userValidation.value, 
          success:false, 
          message:'El nombre de usuario ya existe'});
      };
      
      const emailExist = await userService.getUser({email:req.body.email});
      if(emailExist){
        return res.status(400).json({
          data:userValidation.value, 
          success:false, 
          message:'El email ya existe'});
      };
    };
    return next();
}

const userUpdateValidation= async(req,res,next)=>{
  return validateUser(false,req,res,next);
}
const newUserValidation = (req,res,next)=>{
  return validateUser(true,req,res,next);
}

module.exports = {
  userUpdateValidation,
  newUserValidation
};