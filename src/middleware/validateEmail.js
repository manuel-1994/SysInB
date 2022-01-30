const Clients = require("../services/clients.service");
const Providers = require("../services/providers.service");
const Users = require("../services/users.service");

const validateEmail = async ({user,client,provider},req,res,next) =>{
  const emailExist = user? await new Users().getUser({email:req.body.email}):
                   client? await new Clients().getClient({email:req.body.email}):
                           await new Providers().getProvider({email:req.body.email});  
                                           
    if(emailExist){
    return res.status(400).json({
    data:emailExist, 
    success:false, 
    message:'El email ya existe'});
    };
    return next();
}

const user = (req,res,next)=>{
  validateEmail({user:true}, req,res,next)
}

const client = (req,res,next)=>{
  validateEmail({client:true}, req,res,next)
}

const provider = (req,res,next)=>{
  validateEmail({provider:true}, req,res,next)
}

module.exports = {
  user,
  client,
  provider
}