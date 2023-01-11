import {validationResult} from "express-validator";
import Users from "../../models/Users.js";

export default async (req, res) => {
    // find the validation errors.
    const errors = validationResult(req);

    // if there is any, return the errors.
    //console.log(JSON.stringify(errors));
    if (!errors.isEmpty()) return res.status(400).json({success: false, server_message: errors.array()});

    // destructuring username from req.body.
    const {username} = req.body;

    try {
        // query user in DB. searchUser() returns 'firstname, lastname, username' if there is such a user.
        const search = await Users.searchUser(username);

        // return searched user.
        return res.status(200).json({success: true, user: search});

    } catch (err) {
        return res.status(400).json({success: false, server_message: [{msg: `can not find user. ${err.message}`}]});
    }
}