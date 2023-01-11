import Users from "../../models/Users.js";
import Chats from "../../models/Chats.js";
import Messages from "../../models/Messages.js";
import getMessages from "../messages/getMessages.js";

export default async (socket, username, requestSender, isOnline) => {

    try {

        // delete request sender from requests field from request accepter.
        await Users.deleteRequest(username, requestSender);

        // create an init msg from system to clients.
        const initMsg = await Messages.toClients([username, requestSender]);
        
        // create an init chat for both clients.
        const initChat = await Chats.initChat([username, requestSender], initMsg._id);
        
        // add request sender to contacts field of request accepter.
        await Users.addContact(username, requestSender, initChat._id);

        // add request accepter to contacts field of request sender.
        await Users.addContact(requestSender, username, initChat._id);

        if (isOnline) {

            const messages = await getMessages(requestSender);

            socket.to(requestSender).emit('allMsgs', messages);

            const user = await Users.contacts(requestSender);

            socket.to(requestSender).emit('contacts', user.contacts);

            return true;

        } else {

            return true;

        }
        
        } catch (err) {

            console.log(err.message);

            return false;

        }

}