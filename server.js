import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// destructure environment variables.
const {PORT} = dotenv.config().parsed;

// initialize server.
const app = express();

// middlewares.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// listen to the port.
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}.`);
});