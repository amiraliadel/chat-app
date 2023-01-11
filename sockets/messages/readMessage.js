import Messages from "../../models/Messages.js";

export default async (username, contact, id, socket) => {

    try {

        const read = await Messages.readMessage(id);
        
        if (read.acknowledged) {
            socket.to([contact]).emit('readedMessage', {id: id});
            socket.emit('readedMessage', {id: id});
        }

    } catch (err) {
        throw err;
    }
}