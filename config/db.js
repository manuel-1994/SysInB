const mongoose = require('mongoose');
const { dbUsername, dbPassword, dbHost } = require('./');

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/SysInB`;

const connection = async ()=>{
  console.log(uri);
  const conn = await mongoose.connect(uri);
  console.log("Mongo DB Connected",conn.connection.host);
};

module.exports = {
  connection,
  mongoose
};