import React, {useState, useEffect} from "react";
import {Manager} from 'socket.io-client';
import Guidance from "../../../components/Shared/Guidance/Guidance";
import styles from './Guest.module.css'

const manager = new Manager('http://localhost:3003', {withCredentials: true});
const socket = manager.socket('/guest');

export default function Guest () {
    const [userId, setUserId] = useState('');
    const [room, setRoom] = useState('');
    const [input, setInput] = useState('');
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
        socket.on('join', (data) => {
            setServerMsgs([data]);
            setRoom(data.userId);
            console.log('joined user:', data.userId);
        });
    }, []);
    
    useEffect(() => {
        socket.on('receive', (data) => {
            console.log(data.message);
        });
    }, []);

    useEffect(() => {
        socket.on('users', (data) => {
            console.log(data.message);
        });
    }, []);

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

    const joinRoom = async (event) => {
        event.preventDefault();
        const data = {
            room: room,
            userId: userId
        };
        try {
            socket.emit('joinRoom', data, (res) => {
                setServerMsgs([res]);
            });

        } catch (err) {
            console.log(err.message);
        }
    }

    const handleJoinInput = event => {
        setRoom(event.target.value);
    }

    const clearJoinInput = () => {
        setRoom('');
    }

    return (<>
        <div className={styles.Sidebar}>
            <form onSubmit={joinRoom}>
                <label htmlFor="userId">
                    your id: <span id="userId">{userId}</span>
                </label>
                <label htmlFor="room">
                    <input 
                    type="text" 
                    id="room" 
                    placeholder="enter an ID to join"
                    value={room}
                    onChange={handleJoinInput}
                    onClick={clearJoinInput}
                    />
                </label>
                <button type="submit">join</button>
            </form>
            <p>share your id with someone else to join to your room or enter the id from someone else to join to his/her room</p>
        </div>
        <div className={styles.Content}>
            {(() => {
                if (serverMsgs) {
                    return (serverMsgs.map(msg => <Guidance msg={msg.message} key={msg.message}/>));
                }
            })()}
            <div className={styles.Conversation}>
                <div className={styles.Message}>
                    message
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