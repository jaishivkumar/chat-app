const Message = require("../models/Message")
// const io = require("../../index").io

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const sender = req.user?.username || "Anonymous"

    if (!message || !sender) {
      return res.status(400).json({ error: "Sender and message are required" })
    }

    // Create message with a unique ID for frontend tracking
    const newMessage = new Message({
      sender,
      message,
      // Add an ID that can be used by the frontend to prevent duplicates
      id: new Date().getTime().toString(),
    })

    await newMessage.save()

    // Format the message for socket emission
    const messageToEmit = {
      id: newMessage._id.toString(), // Use MongoDB _id as unique identifier
      sender: newMessage.sender,
      message: newMessage.message,
      timestamp: newMessage.timestamp,
      time: new Date(newMessage.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    const io = req.app.get("io");

    // Emit to all connected clients
    if (io) {
      io.emit("receiveMessage", messageToEmit)
    } else {
      console.error("Socket.io instance not available")
    }

    res.status(201).json(messageToEmit)
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: "Error sending message" })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 })

    // Format messages to match the structure expected by the frontend
    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp,
      time: new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    res.json(formattedMessages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ error: "Error fetching messages" })
  }
}

