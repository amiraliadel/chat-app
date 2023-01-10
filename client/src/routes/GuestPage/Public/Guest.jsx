import React, {useState, useEffect} from "react";
import {Manager} from 'socket.io-client';
import Guidance from "../../../components/Shared/Guidance/Guidance";
import styles from './Guest.module.css'

const manager = new Manager('http://localhost:3003', {withCredentials: true});
const socket = manager.socket('/guest');

export default function Guest () {
    const [userId, setUserId] = useState('');
    const [room, setRoom] = useState('');
    const [serverMsgs, setServerMsgs] = useState('');

    socket.on('error', err => {
        console.log(err);
      });

    useEffect(() => {

    }, [serverMsgs]);
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected');
            setUserId(socket.id);
        });
        
    }, []);

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

    const handleInput = event => {
        setRoom(event.target.value);
    }

    const clearInput = () => {
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
                    onChange={handleInput}
                    onClick={clearInput}
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
        </div>
    </>);
}