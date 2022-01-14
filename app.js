const express = require('express');
const cookie = require('cookie-parser');
const { connection } = require('./config/db');
const app = express();

//middleware
app.use(express.json())
app.use(cookie())

//Connection Db
connection()

//Routes
app.get('/', (req, res)=>{
  res.send('hola mundo')
});

module.exports = app;
