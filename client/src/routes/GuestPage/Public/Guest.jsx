import React, {useState, useEffect} from "react";
import {Manager} from 'socket.io-client';
import Guidance from "../../../components/Shared/Guidance/Guidance";
import styles from './Guest.module.css'

const manager = new Manager('http://localhost:3003', {withCredentials: true});
const socket = manager.socket('/guest');

export default function Guest () {
    const [userId, setUserId] = useState('');
    const [input, setInput] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [serverMsgs, setServerMsgs] = useState('');

    socket.on('error', err => {
        console.log(err);
    });

    useEffect(() => {
        (() => {
            socket.on('connect', () => {
                console.log('connected.');
                if (socket.id !== undefined) {
                    setUserId(socket.id);
                }
            }); 
        })();
    }, [socket.id]);
    
    useEffect(() => {
        socket.on('receive', (data) => {
            console.log(data.message);
            setMsgs([...msgs, data.message]);
        });
    }, [msgs]);

    useEffect(() => {
        socket.on('users', (data) => {
            setMsgs([...msgs, data.message]);
        });
    }, [msgs]);

    useEffect(() => {
        
    }, [serverMsgs]);


    // send msg.
    const sendMessage = async (event) => {
        event.preventDefault();

        const data = {
            message: input
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
        <div className={styles.Sidebar}>
            <h2>your id: <span id="userId">{userId}</span></h2>
            <p>chat with others or open a new window to test the app.</p>
        </div>
        <div className={styles.Content}>
            {(() => {
                if (serverMsgs) {
                    return (serverMsgs.map(msg => <Guidance msg={msg.message} key={msg.message}/>));
                }
            })()}
            <div className={styles.Conversation}>
                <div className={styles.Message}>
                {(() => {
                    if (msgs) {
                        return (msgs.map(msg => <span key={msg}>{msg}</span>));
                    }
            })()}
                </div>        
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