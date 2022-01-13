const express = require('express');
const cookie = require('cookie-parser')
const app = express();
//middleware
app.use(express.json())
app.use(cookie())
//Connection Db

//Routes
app.get('/', (req, res)=>{
  res.send('hola mundo')
});

module.exports = app;
