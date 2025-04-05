
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Favor inicie sesión." });
    }
    try {
        const userInfo =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = userInfo;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Por favor inicie sesión." }); // "Invalid token." });
    }
}
module.exports = authMiddleware;