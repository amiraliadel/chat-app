import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = dotenv.config().parsed;
const {verify} = jwt;

export default async (socket, next) => {
    // assign jwt token.
    if (!socket.handshake.headers.cookie) return;
    const jwtToken = socket.handshake.headers.cookie.split('=')[1];
    try {
        // check if there is a token.
        if (jwtToken !== undefined) {
            // verify token and grab username and id.
            verify(jwtToken, JWT_SECRET, (err, decoded) => {
                if (err) throw new Error(err.message);
                socket.request.username = decoded.name;
                socket.request.id = decoded.sub;
                next();
                
            });
        }
    } catch (err) {
        console.log(err);
    }
}