
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    
    socket.on("disconnect",function(){
        io.emit("user-disconnected", socket.id);
    });

    // io.on("disconnect", (socket) => {
    //     socket.broadcast.emit("user-disconnected", socket.id);
    // });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000);