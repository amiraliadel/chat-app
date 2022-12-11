import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// destructure environment variables.
const {PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME} = dotenv.config().parsed;

//connect to mongoDB using mongoose.
mongoose
    .set('strictQuery', false)
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('connected to the DB.');
    })
    .catch(err => {
        console.log('can\'t connect to the DB.', err.message);
    });

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