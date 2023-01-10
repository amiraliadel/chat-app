import React, {useState, useEffect} from "react";
import {Manager} from 'socket.io-client';
import styles from './Guest.module.css'

const manager = new Manager('http://localhost:3003', {withCredentials: true});
const socket = manager.socket('/guest');

export default function Guest () {
    const [userId, setUserId] = useState('');
    const [room, setRoom] = useState('');

    socket.on('error', err => {
        console.log(err);
      });


    
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
                console.log(res);
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
            content
        </div>
    </>);
}