import { validationResult } from "express-validator";
import Users from "../../models/Users.js";

export default async (req, res) => {
    // find the validation errors.
    const errors = validationResult(req);

    // if there is any, return the errors.
    if (!errors.isEmpty()) return res.status(400).json({success: false, server_message: errors.array()});

    // destructuring request sender => username from req.body.
    const {requestSender} = req.body;
    // assigning username.
    const username = req.username;

    try {
        // delete request sender from requests field from request accepter.
        const user = await Users.deleteRequest(username, requestSender);
        console.log(user);
        //console.log('request sender is deleted from requests array.');
        return res
        .status(200)
        .json({success: true, server_message: `request from ${requestSender} is removed.`, requests: user.requests});

    } catch (err) {
        return res.status(401).json({success: false, server_message: [{msg: err.message}]});
    }
}