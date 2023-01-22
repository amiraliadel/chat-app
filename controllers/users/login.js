import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import encode from "../../helpers/encodeJwtToken.js";
import Users from "../../models/Users.js";

const {compare} = bcrypt;

export default async (req, res) => {
    // find the validation errors.
    const errors = validationResult(req);

    // if there is any, return the errors.
    //console.log(JSON.stringify(errors));
    if (!errors.isEmpty()) return res.status(400).json({success: false, server_message: errors.array()});

    // destructuring login form fields from req.body.
    const {email, password} = req.body;

    try {
        // find the user if exists.
        const user = await Users.findUserByEmail(email);

        //  verify if the passwords match.
        const verifyPassword = await compare(password, user.password);
        if (!verifyPassword) throw new Error('password does not match.');

        // create a jwt token and send it to the client.
        const jwtToken = await encode({
            name: user.username, 
            sub: user._id, 
            exp: Math.floor(Date.now() / 1000) + 60 * 60  * 24
        });

        // return jwt token and a success message to the client.
        return res
        .status(200)
        .cookie('jwtToken', jwtToken, {httpOnly: true, secure: true, sameSite: 'None'})
        .json({server_message: 'you are successfully logged in.', success: true, username: user.username});
        
    } catch (err) {
        return res.status(400).json({success: false, server_message: [{msg: `can not login. ${err.message}`}]});
    }
}