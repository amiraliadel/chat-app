
let connectedGuests = [];

export default async (socket) => {
    // on connection
    connectedGuests.push(socket.id);
    console.log(connectedGuests);
    // on disconnect
    socket.on('disconnect', () => {
        connectedGuests = removeUser(socket.id);
        console.log(connectedGuests);
    });
    socket.on('joinRoom', async (data, res) => {
        //console.log(data);
        if (connectedGuests.includes(data.room)) {
            socket.join(data.room);
            console.log('rooms:', socket.rooms);
            socket.to([data.room]).emit('join', {message: `user with id: ${socket.id} is joined you`});
            res(`you are connected to the user with id: ${data.room}.`);
        } else {
            res(`there is no any room with id: ${data.room}. please try again.`);
        }
    });
}
function removeUser (socketId) {
    return connectedGuests.filter(id => id !== socketId);
}