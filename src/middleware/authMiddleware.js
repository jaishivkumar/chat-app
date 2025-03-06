const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.header("Authorization");
    console.log("authHeader---", authHeader)
    if (!authHeader) return res.status(401).json({ error: "Access Denied" });
  
    const token = authHeader.split(" ")[1]; // Extracts the actual token
    // console.log("token---", token)

    if (!token) return res.status(401).json({ error: "Access Denied" });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid Token" });
    }
};
