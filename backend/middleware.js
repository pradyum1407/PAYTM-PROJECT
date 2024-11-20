const jwt = require("jsonwebtoken");
require("dotenv").config();

const authmiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization token missing or malformed" });
    }

    const jwttoken = token.split(" ")[1];

    try {
        const decodedvalue = jwt.verify(jwttoken, process.env.JWT_SCERET);        
        req.userid = decodedvalue.userid; // Attaching userId to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authmiddleware;
