import React, {useState, useEffect} from "react";
import {Manager} from 'socket.io-client';
import styles from './Guest.module.css'

const manager = new Manager('http://localhost:3003', {withCredentials: true});
const socket = manager.socket('/');

export default function Guest () {
    const [userId, setUserId] = useState('');

    socket.on('error', err => {
        console.log(err);
      });

    socket.on('connect', () => {
        console.log('connected');
    });
    console.log(socket.id);
    useEffect(() => {
        setUserId('usdlfjnsfjsfvsld');
    });

    return (<>
        <div className={styles.Sidebar}>
            <form>
                <label htmlFor="userId">
                    your id: <span id="userId">{userId}</span>
                </label>
                <label htmlFor="room">
                    <input type="text" id="room" placeholder="enter an ID to join"/>
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