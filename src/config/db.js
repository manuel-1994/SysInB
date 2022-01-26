const mongoose = require('mongoose');
const config = require('.');

const uri = `${config.dbUri}/${config.test?"test":"SysInB"}`;

const connection = async ()=>{
  const conn = await mongoose.connect(uri);
  console.log("Mongo DB Connected",conn.connection.host);
};

module.exports = {
  connection,
  mongoose
};