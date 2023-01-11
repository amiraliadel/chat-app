import Users from "../../models/Users.js";

export default async (socket, requestTo, username, isOnline) => {

    try {
        // get the contacts array from client user document.
        const userContacts = await Users.contacts(username);
        // check if the client is already friend with requested user.
        if (userContacts.contacts.length !== 0) {
            userContacts.contacts.map(contact => {
                if (contact.username === requestTo) throw new Error(`you are already friend with ${requestTo}.`);
            });
        }
        // get the requests array from requestedTo user document.
        const userRequests = await Users.requests(requestTo);
        // check if the client has sent already a request.
        if (userRequests.requests.length !== 0) {
            userRequests.requests.map(request => {
                if (request.username === username) throw new Error('you already have sent a request.');
            });
        }
        // sending request.
        await Users.addRequest(requestTo, userContacts.firstname, userContacts.lastname, username, userContacts._id);

        const user = await Users.requests(requestTo);
        
        // return response.
        if (isOnline) {
            socket.to(requestTo).emit('requests', user.requests);
        }
        //return res.status(200).json({success: true, server_message: 'your request has been sent successfully.'});
    } catch (err) {
        //return res.status(401).json({success: false, server_message: [{msg: err.message}]});
        console.log(err.message);
    }
}