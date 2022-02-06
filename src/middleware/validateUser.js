const  validateEmail  = require("./validateEmail");
const Users = require("../services/users.service");

const validateUser = async (req,res,next) =>{
      const userService = new Users();
      const user = await userService.getData({username:req.body.username});
        if(user){
          return res.status(400).json({
            success:false, 
            message:'El nombre de usuario ya existe'});
       } 
    return validateEmail.user(req,res,next);
}

module.exports = validateUser;