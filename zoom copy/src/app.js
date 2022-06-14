const express=require('express');
const app=express();

// creamos un servidor httpapartir de la libreria de express
const http=require('http').Server(app);
// para generar una comunicacion vamosatrabajar con socket.io
const io=require('socket.io')(http);
// routes
app.use(require('./routes/soom.routes'));
// donde vamos cargar los html con lo que vamos trabajar.
app.use(express.static(__dirname + "/public"));

io.on("conection", (socket)=>{
    socket.on("stream", (image)=>{
    socket.broadcast.emit("stream", image)
    })
})

module.exports = http;