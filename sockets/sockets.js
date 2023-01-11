// messages
import getMessages from './messages/getMessages.js';
import sendMessages from './messages/sendMessages.js';
import readMessage from './messages/readMessage.js';

// users
import getContacts from './users/getContacts.js';
import getRequests from './users/getRequests.js';

// requests
import sendRequest from './requests/sendRequest.js';
import acceptRequest from './requests/acceptRequest.js';
import removeRequest from './requests/removeRequest.js';

// an array of all connected users.
let connectedUsers = [];

export default async (socket) => {
    let myOnlineContacts = [];
    // on connection.
    console.log(`${socket.request.username} is connected to the server with socket id: ${socket.id}`);

    // create user info.
    const user = {
        username: socket.request.username,
        socketId: socket.id,
    }
    // remove user
    connectedUsers = removeUser(socket.request.username);

    socket.join(user.username);

    // add user
    addUser(user);
    //console.log('list of users: ', connectedUsers);
    
    // on disconnect.
    socket.on('disconnect', (reason) => {
        console.log(reason);
        connectedUsers = removeUser(socket.request.username);
        myOnlineContacts.map(contact => {
            socket.to(contact).emit('isOnline', {contact: user.username, isOnline: false});
        });
    });

    // is contact online
    socket.on('isContactOnline', async (contact, res) => {

        const isOnline = await isConnected(contact);

        res(isOnline);
    });

    /*                    /messages                    */
    // get all messages from db.
    socket.on('getMessages', async (data, res) => {

        const messages = await getMessages(user.username);

        res(messages);
    });

    // readed message
    socket.on('readMessage', async (data) => {
        //console.log('msg.id:', data.id);
        const read = await readMessage(user.username, data.contact, data.id, socket);

    });
    // send message.
    socket.on('sendMessage', async (data) => {

        const isOnline = await isConnected(data.contact);

        await sendMessages(socket, data, isOnline);
        
    });

    /*                    /requests                    */
    // send request
    socket.on('sendRequest', async (data, res) => {

        const isOnline = await isConnected(data.requestTo);

        await sendRequest(socket, data.requestTo, user.username, isOnline);
        
        res(true);

    });

    // accept request.
    socket.on('acceptRequest', async (data, res) => {

        // if request sender is online emit contacts.
        const isOnline = await isConnected(data.requestSender);

        // accepting request.
        const accept = await acceptRequest(socket, user.username, data.requestSender, isOnline);

        accept ? res(true) : res(false);
    
    });

    // remove request.
    socket.on('removeRequest', async (data, res) => {

        // removing request.
        const remove = await removeRequest(user.username, data.requestSender);
        res(remove);
    });
    /*                    /users                    */
    // get requests
    socket.on('getRequests', async (data) => {

        await getRequests(socket, user.username);

    });

    // get contacts.
    socket.on('getContacts', async (data) => {
        //console.log(data);
        const contacts = await getContacts(socket.request.username);

        myOnlineContacts = await onlineContacts(contacts);
        console.log(contacts);
        socket.emit('contacts', contacts);

        myOnlineContacts.map(contact => {

            socket.to(contact).emit('isOnline', {contact: user.username, isOnline: true});

        });

    });
}

function removeUser (username) {
    return connectedUsers.filter(user => user.username !== username);
}
function addUser (user) {
    connectedUsers.push(user);
}
async function isConnected (contact) {
    for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i].username === contact) {
            return true;
        }
    }
    return false;
}
async function onlineContacts (contacts) {
    let myArr = [];
    
    for (let i = 0; i < contacts.length; i++) {
        for (let x = 0; x < connectedUsers.length; x++) {
            if (contacts[i].username === connectedUsers[x].username) {
                myArr.push(contacts[i].username);
            }
        }
    }
    return myArr;
}