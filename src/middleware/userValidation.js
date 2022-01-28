const Users = require("../services/users.service");

const validateUser = async (req,res,next) =>{
      const userService = new Users();
      const userExist = await userService.getUser({username:req.body.username});
        if(userExist){
          return res.status(400).json({
            data:userExist, 
            success:false, 
            message:'El nombre de usuario ya existe'});
       } 
 
      const emailExist = await userService.getUser({email:req.body.email});
      if(emailExist){
        return res.status(400).json({
          data:emailExist, 
          success:false, 
          message:'El email ya existe'});
      };
    return next();
}


module.exports = validateUser