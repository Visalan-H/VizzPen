const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config();
const secretJWTKEY = process.env.SECRET_JWT_KEY

const decodeToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ msg: "no token" })

    jwt.verify(token, secretJWTKEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token', error: err.message }); // Handle error and send response
        }
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    });

}

module.exports = decodeToken;