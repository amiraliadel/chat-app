import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import {createServer} from 'http';
import users from './routes/users.js';
import requests from './routes/requests.js';
import decodeJwtToken from './helpers/decodeJwtToken.js';
import sockets from './sockets/sockets.js';

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

// guest socket
io.of('/guest').on('connection', (socket) => {
    // broadcast to all users
    socket.broadcast.emit('users', {message: `${socket.id} is connected.`, style: 'Center', msgId: `${socket.id}`+Date.now()});
    socket.on('disconnect', () => {
        socket.broadcast.emit('users', {message: `${socket.id} is disconnected.`, style: 'Center', msgId: `${socket.id}`+Date.now()});
    });
    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('receive', {message: `${socket.id} => ${data.message}`, style: 'Left', msgId: `${socket.id}`+Date.now()});
        socket.emit('receive', {message: `${data.message} <= ${socket.id}`, style: 'Right', msgId: `${socket.id}`+Date.now()});
    });
});

// authorize jwt token from socket.handshake.headers.cookie.
io.use(decodeJwtToken);
// on connection.
io.on('connection', sockets);

// routes.
app.use('/users', users);
app.use('/requests', requests);

// listen to the port.
server.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}.`);
});