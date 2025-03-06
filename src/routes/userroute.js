const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { getMessages,sendMessage  } = require("../controllers/chatController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.post("/sendmessages", authMiddleware, sendMessage)
router.get("/messages", authMiddleware, getMessages);

 
module.exports = router;
