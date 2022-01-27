const express = require('express');
const cookie = require('cookie-parser');
const { connection } = require('./config/db');
const { users } = require('./router');
const clients = require('./router/clients.routes');
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
