import Users from "../../models/Users.js";
import Chats from "../../models/Chats.js";
import Messages from "../../models/Messages.js";

export default async (username) => {

    try {

        const user = await Users.contacts(username);

        // all messages arrray.
        const allMessages = await Promise.all(
            user.contacts.map(async contact => {
                const contacts = {chatId: null, username: null, messages: []};
                contacts.username = contact.username;
                contacts.chatId = contact.chatId; 
                const messagesIds = await Chats.messages(contact.chatId);
                const messages = await Promise.all(
                    messagesIds.map(async message => {
                        const msg = await Messages.getMessage(message.messageId);
                        return msg;
                    })
                ); 
                contacts.messages = messages;
                return contacts;
            })
        );

        //console.log(allMessages[0].messages);
        return allMessages;

    } catch (err) {

        console.log(err.message);
        return false;
    }
}