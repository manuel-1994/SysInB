const auth = require("./auth.routes");
const clients = require("./clients.routes");
const products = require("./products.routes");
const providers = require("./providers.routes");
const users = require("./users.routes");

module.exports = {
  users,
  clients,
  providers,
  products,
  auth
};