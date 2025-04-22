
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if(!authHeader?.startsWith('Bearer ')){
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const userInfo =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = userInfo;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Su sesión ha expirado." });   
        }

        return res.status(403).json({ message: "Por favor inicie sesión." }); // "Invalid token." });
    }
}
module.exports = authMiddleware;