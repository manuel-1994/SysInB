const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, ()=>{
  console.log(`App listening at http://localhost:${config.port}`);
});

process.on('unhandledRejection',(err,promise)=>{
  console.log('Error',err.message);
  server.close(()=>process.exit(1));
});