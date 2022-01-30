const clients = require("./clients.routes");
const providers = require("./providers.routes");
const users = require("./users.routes");

module.exports = {
  users,
  clients,
  providers
};