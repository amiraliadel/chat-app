import {validationResult} from 'express-validator';
import Users from '../../models/Users.js';
import bcrypt from 'bcrypt';

const {hash} = bcrypt;
export default async (req, res) => {
    // find the validation errors.
    const errors = validationResult(req);

    // if there is any, return the errors.
    if (!errors.isEmpty()) return res.status(400).json({success: false, server_message: errors.array()});

    // destructuring registration form fields from req.body.
    const {firstname, lastname, username, email, password} = req.body;

    // check if username and email is available.
    try {
        const isExist = await Users.isExist(username, email);
        if (isExist !== null) {
            if (isExist.username === username) return res.status(500).json({success: false, server_message: [{msg: 'username is already exist.'}]});
            if (isExist.email === email) return res.status(500).json({success: false, server_message: [{msg: 'email is already exist.'}]});
        }
        else {
            // hashing password.
            const hashedPassword = await hash(password, 10);

            // create user data.
            await Users.createUser(
                firstname, 
                lastname, 
                username, 
                email, 
                hashedPassword,
                'user',
            );
            return res.status(200).json({server_message: 'User has been successfully registered.', success: true});
        }
    } catch (err) {
        return res.status(500).json({success: false, server_message: err.message});
    }
}