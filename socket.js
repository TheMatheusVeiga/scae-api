// const {Server} = require("socket.io");
// let io;
// let serverApi;


// exports.init = (server) => {
//     serverApi = server;
    // io = new Server(server, {
        // cors: {
        //   origin: "http://localhost:3000",
        //   methods: ["GET", "POST"]
        // },
    //   });
    // return io;
//   };


// exports.get = () => {
//     if (!io) {
//       this.init(serverApi);
//     }
//     return io;
//   }


// const {Server} = require('socket.io');

// class SocketService {
//    constructor(server) {
//     //  this.io = socketIo(server);
//     // this.io = new Server(server, {
//     //     cors: {
//     //       origin: "http://localhost:3000",
//     //       methods: ["GET", "POST"]
//     //     },
//     //   });
//      this.io = this.init(server);
//      this.io.on('connection', (socket) => {
//         console.log(`User Connected: ${socket.id}`)
//    });
//  } 
// }

// module.exports = SocketService;


// const {Server} = require('socket.io');
// class SocketService {
//     constructor(server){
//         this.init(server);
//         this.io.on('connection', (socket) => {
//             console.log(`User Connected: ${socket.id}`)
//        });
//     }

//     init(server){
//         this.io = new Server(server, {
//             cors: {
//               origin: "http://localhost:3000",
//               methods: ["GET", "POST"]
//             },
//           });
//         // console.log(this.io);
//         return this.io;
//     }

//     emiter(event, body){
//         if(body)
//           this.io.emit(event, body);
//     }
// }
// module.exports = SocketService;
