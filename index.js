
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server); // Pass krta h http server instance directly

// Handle socket.io connections
io.on("connection", (socket) => {
  socket.on("user-message", (message)=>{
    io.emit("message", message);
  });
});

// Serve static files add
app.use(express.static(path.resolve("./public")));

// Serve index.html frontend
app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

server.listen(9000, () => console.log(`Server Started at PORT: 9000`));
