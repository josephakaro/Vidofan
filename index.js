const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle screen sharing
    socket.on("share_screen", (streamData) => {
        // Broadcast screen data to all other clients
        socket.broadcast.emit("view_screen", streamData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});