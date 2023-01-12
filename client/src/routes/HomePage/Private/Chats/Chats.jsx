import React, {useEffect, useState, useContext} from "react";
import {SocketContext} from "../../../../contexts/SocketContext";
import {useParams} from 'react-router-dom';
import Messages from "./Messages/Messages";
import styles from './Chats.module.css';

export default function Chats () {
    const {messages, onlineContacts, socket} = useContext(SocketContext);
    const {contact} = useParams();
    const [isOnline, setIsOnline] =  useState(false);
    const [msgs, setMsgs] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        (async () => {
            await checkContact();
        })();
    }, [onlineContacts]);

    useEffect(() => {
        (async () => {
            await getMessages();
            
        })();
    }, [contact, messages]);

    // is contact online for the first time
    const checkContact = async () => {
        try {
            socket.emit('isContactOnline', contact, (res) => {
                setIsOnline(res);
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // filter all messages and return only contact's messages.
    const getMessages = async () => {
        
        messages.forEach(user => {
            if (user.username === contact && msgs !== undefined) setMsgs(user.messages);
        });
    }

    // send msg.
    const sendMessage = async (event) => {
        event.preventDefault();

        const data = {
            message: input,
            contact: contact
        };

        try {

            socket.emit('sendMessage', data);

            setInput('');

        } catch (err) {
            console.log(err);
        }
    }

    const handleInput = event => {
        setInput(event.target.value);
    }

    const clearInput = () => {
        setInput('');
    }

    return (<>
    
        <div className={styles.Chats}>
            <div className={styles.Title}>
                <h3>{contact}</h3>
                {isOnline ? <span>online</span> : <span>offline</span>}
            </div>
            <div className={styles.Conversation}>
                <Messages messages={msgs} contact={contact}/>        
                <div className={styles.SendMessage}>
                    <form onSubmit={sendMessage}>
                        <label htmlFor="message">
                            <input 
                                type="text" 
                                name="message" 
                                placeholder="your message" 
                                value={input} 
                                onChange={handleInput}
                                onClick={clearInput}
                                />
                        </label>
                        <label htmlFor="submit">
                            <button type="submit">send</button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </>);
}