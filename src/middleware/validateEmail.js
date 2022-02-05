const Clients = require("../services/clients.service");
const Providers = require("../services/providers.service");
const Users = require("../services/users.service");

const emailVerify = {
  user: async (email) => await new Users().getUser({email}),
  client:  async (email) => await new Clients().getClient({email}),
  provider: async (email) => await new Providers().getProvider({email})
}

const validateEmail = async (param,req,res,next) =>{
    const emailExist = await emailVerify[param](req.body.email);

    if(emailExist){
    return res.status(400).json({
    data:emailExist, 
    success:false, 
    message:'El email ya existe'});
    };
    return next();
}

const user = (req,res,next)=>{
  validateEmail("user", req,res,next)
}

const client = (req,res,next)=>{
  validateEmail("client", req,res,next)
}

const provider = (req,res,next)=>{
  validateEmail("provider", req,res,next)
}

module.exports = {
  user,
  client,
  provider
}