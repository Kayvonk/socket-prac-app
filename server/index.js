const express = require('express');
const app = express();
const PORT = 3001;
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

let users = [];
let rooms = [];

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:5173"
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);


 //sends the message to all the users on the server
  socket.on('message', (data) => {
    console.log("message:", data);
    socketIO.emit('messageResponse', data);
    
  });

 //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

  socket.on('newRoom', (data) => {
    //Adds the new user to the list of users
    rooms.push(data);
    console.log(rooms);
    //Sends the list of users to the client
    socketIO.emit('newRoomResponse', rooms);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
       //Updates the list of users when a user disconnects from the server
       users = users.filter((user) => user.socketID !== socket.id);
       // console.log(users);
       //Sends the list of users to the client
       console.log("users:", users);
       socketIO.emit('newUserResponse', users);
       socket.disconnect();
  });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// const express = require("express");

// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   // ...
// });

// httpServer.listen(3000);