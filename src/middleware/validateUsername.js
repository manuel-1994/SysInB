const Users = require("../services/users.service");
const validateUsername = async (req,res,next) =>{
      const userService = new Users();
      const userExist = await userService.getUser({username:req.body.username});
        if(userExist){
          return res.status(400).json({
            data:userExist, 
            success:false, 
            message:'El nombre de usuario ya existe'});
       } 
    return next();
}


module.exports = validateUsername