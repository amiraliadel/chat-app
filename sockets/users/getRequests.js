import Users from "../../models/Users.js";

export default async (socket, username) => {
    try {

        const user = await Users.requests(username);
        //console.log(user);
        // return response.
        socket.emit('requests', user.requests);
        //return res.status(200).json({success: true, server_message: 'your request has been sent successfully.'});
    } catch (err) {
        //return res.status(401).json({success: false, server_message: [{msg: err.message}]});
        console.log(err.message);
    }
}