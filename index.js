const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Escuchar el evento "playVideo" del cliente
    socket.on('playVideo', () => {
        // Emitir la URL del video a todos los clientes conectados
        console.log('Se ha emitido el evento playVideo');
        io.emit('playVideo');
    });

    socket.on('pauseVideo', () => {
        // Emitir la URL del video a todos los clientes conectados
        console.log('Se ha emitido el evento pauseVideo');
        io.emit('pauseVideo');
    });

    socket.on('stopVideo', () => {
        // Emitir la URL del video a todos los clientes conectados
        console.log('Se ha emitido el evento stopVideo');
        io.emit('stopVideo');
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
