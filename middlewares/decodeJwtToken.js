import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = dotenv.config().parsed;
const {verify} = jwt;


export default async (req, res, next) => {
    // assign jwt token.
    const jwtToken = req.cookies['jwtToken'];
    
    try {
        // check if there is a token.
        if (jwtToken !== undefined) {
            // verify token and grab username and id.
            verify(jwtToken, JWT_SECRET, (err, decoded) => {
                if (err) throw new Error(err.message);
                req.username = decoded.name;
                req.id = decoded.sub;
                
                next();
            });
        }
    } catch (err) {
        return res.status(401).json({server_message: err.message, success: false});
    }
}
