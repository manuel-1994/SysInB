const Clients = require("../services/clients.service");
const Providers = require("../services/providers.service");
const Users = require("../services/users.service");

const methods = {
  user:  (req,res,next)=> validateEmail(new Users, req,res,next),
  client:  (req,res,next)=> validateEmail(new Clients, req,res,next),
  provider:  (req,res,next)=> validateEmail(new Providers, req,res,next)
}

const validateEmail = async (service,req,res,next) =>{
    const email = await service.getData({email: req.body.email}); 
    if(email){
      return res.status(400).json({
        success:false, 
        message:'El email ya existe'});
    };
    return next();
}

module.exports =  methods;