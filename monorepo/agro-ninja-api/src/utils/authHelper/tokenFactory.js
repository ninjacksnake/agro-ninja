require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
    return token;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );
    return refreshToken;
}

const tokenRefresher = (refreshToken) => {
    try {
        const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const freshToken = generateToken(token);
        return freshToken;
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    generateToken: generateToken,
    generateRefreshToken: generateRefreshToken,
    tokenRefresher: tokenRefresher,
}