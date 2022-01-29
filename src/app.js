const express = require('express');
const cookie = require('cookie-parser');
const { connection } = require('./config/db');
const { users, clients } = require('./router');
const app = express();

//middleware
app.use(express.json());
app.use(cookie());

//Connection Db
connection();

//Routes
users(app);
clients(app);
module.exports = app;
