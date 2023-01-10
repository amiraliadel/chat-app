import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import {createServer} from 'http';
import users from './routes/users.js';

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
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true
    }
});

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

// routes.
app.use('/users', users);

// socket
io.of('/guest').on('connection', (socket) => {
    // broadcast to all users
    socket.broadcast.emit('users', {message: `${socket.id} is connected.`});
    socket.on('disconnect', () => {
        socket.broadcast.emit('users', {message: `${socket.id} is disconnected.`});
    });
    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('receive', {message: `${socket.id} => ${data.message}`});
    });
});
// listen to the port.
server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}.`);
});