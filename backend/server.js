const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const penRouter = require('./routes/penRoutes')
const userRouter = require('./routes/userRoutes')
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGODB_URL;

const app = express();

app.use(cookieParser())
app.use(cors(
    { origin: "https://vizzpen.vercel.app", credentials: true }
));
app.use(express.json())
app.use('/pen', penRouter)
app.use('/user', userRouter)

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.error("error while connecting to mongodb", err);

    })
