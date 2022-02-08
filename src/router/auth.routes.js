const express = require('express')
const Auth = require('../services/auth.service')

const auth = (app) =>{
  const router = express.Router();
  const AuthService = new Auth();
  app.use('/api/auth', router);

  router.post('/signin', async (req,res)=>{
    const {email, password} = req.body;
    const response = await AuthService.signIn(email,password);
    return res.status(200).cookie('token',response.token,{
      httpOnly:true
    }).json(response);
  })

  router.post('/logout', async (req,res)=>{
    return res.status(200).cookie('token','',{
      httpOnly:true,
      //sameSite:"none",
      //secure:true,
      expires:new Date()
    }).json({logout: true})
  })
}

module.exports = auth