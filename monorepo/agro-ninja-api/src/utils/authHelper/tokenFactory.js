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
   // console.log('token is generated token', token)
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
    //console.log('refresh token is ', refreshToken)

    return refreshToken;
}

const tokenRefresher = (refreshToken) => {
    try {
       // console.log('token refresher token is ', refreshToken)
        const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const freshToken = generateToken(token);
        return freshToken;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken: generateToken,
    generateRefreshToken: generateRefreshToken,
    tokenRefresher: tokenRefresher,
    verifyToken: verifyToken,
}