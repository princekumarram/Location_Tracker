//start the app by--npx nodemon start

/*
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "html");
// app.set("view engine", "ejs");
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
// app.use(function(req, res) {
//     res.status(404).send("Page Not Found");
// });

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000);

*/


const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file when accessing the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.io connection setup
io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});