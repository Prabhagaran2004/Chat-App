const jwt = require('jsonwebtoken');

const generateToken = ( userId , res ) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn: '14d'
    })

    res.cookie("jwt", token, {
        maxAge : 14 * 24 * 60 * 60 * 1000, // 14 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
        sameSite: 'strict' // Helps prevent CSRF attacks
    });
    return token
}

module.exports = { generateToken };
