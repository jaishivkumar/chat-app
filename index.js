require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const userroute = require("./src/routes/userroute");

const app = express();
app.use(express.json());
app.use(require("cors")());

connectDB();

app.use("/api", userroute);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Attach `io` to `app` for global access
app.set("io", io);

// Initialize WebSocket handling
require("./src/sockets/chatSocket")(io);

server.listen(5000, () => console.log("Server running on port 5000"));

// Export app and io
module.exports = { app, server, io };
