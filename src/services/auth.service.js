const jwt = require('jsonwebtoken')
const Users=require('./users.service')

class Auth{
  constructor(){
    this.users = new Users()
  }

  async signIn(email,password){
    const user = await this.users.getData({email});

    if(user && user.password === password){
      const token = this.#tokenGenerate(user);
      const data = user.toObject();
      delete data.password;
      delete data.__v;
      return {data,token,success:true,}
    }

    return {success: false, message: 'Las credenciales no coinciden'}
  }

   #tokenGenerate (user){
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      _id: user._id,
      username: user.usermane,
      email: user.email,
      rol: user.rol,
      exp: exp.getDate()/1000
    },'123456')
  }
}

module.exports = Auth