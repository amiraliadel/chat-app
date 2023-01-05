import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = dotenv.config().parsed;
const {sign} = jwt;

export default async (payload) => {
    // get payload and return signed token.
    try {
        const encode = sign(JWT_SECRET);
        return encode;
    } catch (err) {
        throw err;
    }
}