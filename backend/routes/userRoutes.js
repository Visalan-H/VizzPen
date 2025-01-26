const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const  decodeToken  = require('../middleware/decodeToken');

const secretJWTKEY = process.env.SECRET_JWT_KEY;

const makeTokenSetCookie = (res, id) => {
    const token = jwt.sign({ id }, secretJWTKEY, { expiresIn: '3d' });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });
}

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password })
        await user.save();
        await makeTokenSetCookie(res, user._id);
        res.status(201).json(user);
    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ msg: 'Email already exists' });
        }

        res.status(400).json({ msg: error.message });
    }
})
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        if (user) {
            await makeTokenSetCookie(res, user._id);
            res.status(200).json(user);
        }
        else {
            res.status(401).json({ msg: "Invalid email or password" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

userRouter.get('/protected', decodeToken, (req, res) => {
    res.status(200).json({ msg: "Verified", user: req.user })
})

module.exports = userRouter;