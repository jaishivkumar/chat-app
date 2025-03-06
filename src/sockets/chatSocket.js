const Message = require("../models/Message");
const { io } = require("../../index"); // Importing the same instance


module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        Message.find().then((messages) => {
            socket.emit("chatHistory", messages);
        });

        socket.on("sendMessage", async (data) => {
            console.log("sendMessage ----", data.message )
            const newMessage = new Message({ sender: data.sender, message: data.message });
            await newMessage.save();
            io.emit("receiveMessage", newMessage);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
