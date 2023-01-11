import Users from "../../models/Users.js";
import Chats from "../../models/Chats.js";
import Messages from "../../models/Messages.js";

export default async (socket, data, isOnline) => {
    // destructuring message and friend from data. friend is the message receiver.
    const {message, contact} = data;
    // assigning username. the message sender.
    const username = socket.request.username;
    try {
        // get chat id.
        const chatId = await Users.chatId(username, contact);
        
        // send message
        const createMsg = await Messages.createMsg(username, contact, message);
        //console.log(createMsg);
        // add message id to chat documents.
        await Chats.addMsgId(chatId, createMsg._id);

        // if contact is connected emit a message.
        if (isOnline) {
            socket.to([contact]).emit('receive', {message: createMsg, chatId: chatId});
        }
        socket.emit('receive', {message: createMsg, chatId: chatId});

    } catch (err) {
        throw err;
    }
}