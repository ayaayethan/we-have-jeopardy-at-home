const { Server } = require("socket.io");
const express = require("express");
const app = express();
const  http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const { createUserArray } = require("./helpers/createUserArray.js");

const io = new Server(server, {
  cors: {
    origin: ["https://9cc9-74-51-156-156.ngrok-free.app", "http://localhost:3000"]
  }
})

let users = {};
const board = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('player-joined', (name) => {
    console.log(`${name} has joined`);

    users[socket.id] = {
      name,
      points: 0
    };

    let userArray = createUserArray(users);

    console.log('All Users', userArray)

    io.emit('updatePlayerList', userArray);
    socket.emit('onlyUpdateBoard', board);
  })

  socket.on('givePoints', (points, name) => {
    for (key in users) {
      if (users[key].name === name) {
        users[key].points += Number(points);
        break;
      }
    }
    let userArray = createUserArray(users);
    io.emit('updatePlayerList', userArray);
  })

  socket.on('showAnswer', (coords) => {
    let [row, col] = coords;
    board[row][col] = 1;
    io.emit('showAnswer');
  })

  socket.on('openQuestion', (coords => {
    let [row, col] = coords;

    io.emit('updateBoard', board, coords);
  }))

  socket.on('player-disconnected', (id) => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];

    let userArray = createUserArray(users);

    socket.disconnect(true);
    io.emit('updatePlayerList', userArray);
  })

  socket.on('player-clicked', (name) => {
    io.emit('player-clicked', name);
  })

  socket.on('button-reset', () => {
    io.emit('button-reset');
  })
})

server.listen(3001, () => {
  console.log("Server connected on port 3001");
});