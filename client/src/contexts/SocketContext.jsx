import React, {createContext, useState, useEffect} from "react";
import {Manager} from 'socket.io-client';

const SocketContext = createContext();

const manager = new Manager('http://localhost:3003/', {withCredentials: true});
const socket = manager.socket('/');


function SocketProvider ({children}) {
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [onlineContacts, setOnlineContacts] = useState([]);

    socket.on('error', err => {
        console.log(err);
      });

    socket.on('connect', () => {
        console.log('connected');
    });
    
    useEffect(() => {
        (async () => {
            await getMessages();
        })();
    }, []);

    useEffect(() => {
        socket.on('isOnline', (data) => {
            const contact = data.contact;
            if (data.isOnline) {
                setOnlineContacts([...onlineContacts, contact]);
            } else if (!data.isOnline) {
                setOnlineContacts(current => current.filter(contact => contact !== data.contact));
            }
            console.log(`${data.contact} is online? ${data.isOnline}`);
            
        })
    }, [onlineContacts]);

    useEffect(() => {
        
        socket.on('receive', async (data) => {
            let allArray = [];
            messages.forEach(contact => {
                
                if (contact.chatId === data.chatId) {
                    const obj = {chatId: null, messages: null, username: null};
                    obj.chatId = data.chatId;
                    obj.username = contact.username;
                    const msgs = [...contact.messages, data.message];
                    obj.messages = msgs;
                    allArray.push(obj);
                } else {
                    allArray.push(contact);
                }
                }
            );
            setMessages(allArray);
        });
  
       
        socket.on('readedMessage', async (data) => {
        
            let allMessages = messages.slice();
            
            allMessages.forEach(contact => contact.messages.forEach(msg => {
                if (msg._id === data.id) msg.read = true;
            }));
            setMessages(allMessages);
        });
    }, [messages]);

    useEffect(() => {
        socket.on('allMsgs', (msgs) => {
            setMessages(msgs);
        });
    }, [messages]);
    
    useEffect(() => {
        
        socket.on('contacts', (contacts) => {
            //console.log('socket context => contacts:', contacts);
            setContacts(contacts);
        });
        
    }, [contacts]);

    useEffect(() => {
        
        socket.on('requests', (requests) => {
            setRequests(requests);
        });

    }, [requests]);
    
    

    // get all messages
    const getMessages = async () => {

        try {

            socket.emit('getMessages', 'data', (msgs) => {

                setMessages(msgs);
            });
        } catch (err) {

            console.log(err.message);

        }

    }

    // get contacts
    const getContacts = async () => {
        try {
            socket.emit('getContacts', 'data');
        } catch (err) {
            console.log(err.message);
        }
    }

    // get requests
    const getRequests = async () => {
        try {
            socket.emit('getRequests', 'data');
        } catch (err) {
            console.log(err.message);
        }
    }
    
    return(
        <SocketContext.Provider 
            value={{messages, 
                    contacts, 
                    requests, 
                    onlineContacts, 
                    getRequests, 
                    getContacts, 
                    getMessages,
                    socket}}
            >
            {children}
        </SocketContext.Provider>
    );
}

export {SocketContext, SocketProvider};