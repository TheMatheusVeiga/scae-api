const app = require('./Src/app');
const db = require('./Src/Config/Database.js');
const http = require("http");
const {Server} = require("socket.io");
const port = process.env.PORT || 3000;

//Gracefull Shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM (Ctrl+C) alert !!');
  console.log('Closing http server.');
  server.close(() => {
    db.terminate();
    console.log('Http server closed.');
  });
});

//Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "https://scae.apps.theveiga.com",
      methods: ["GET", "POST"]
    },
  });
global.io = io;

//Port Config
server.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});