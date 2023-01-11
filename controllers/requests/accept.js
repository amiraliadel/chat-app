import {validationResult} from "express-validator";
import Users from "../../models/Users.js";
import Messages from "../../models/Messages.js";
import Chats from "../../models/Chats.js";

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
        await Users.deleteRequest(username, requestSender);

        // create an init msg from system to clients.
        const initMsg = await Messages.toClients([username, requestSender]);
        console.log('msg id:', initMsg._id);
        // create an init chat for both clients.
        const initChat = await Chats.initChat([username, requestSender], initMsg._id);
        console.log('chat id:', initChat._id);
        // add request sender to contacts field of request accepter.
        await Users.addContact(username, requestSender, initChat._id);

        // add request accepter to contacts field of request sender.
        await Users.addContact(requestSender, username, initChat._id);

        const user = await Users.userData(username);
        console.log(user);

        return res
        .status(200)
        .json({success: true, 
              server_message: `${requestSender} is added to your contact.`, 
              requests: user.requests, 
              contacts: user.contacts});

    } catch (err) {
        return res.status(400).json({success: false, server_message: [{msg: err.message}]});
    }
}