import React, {useState, useEffect, useContext} from 'react';
import { SocketContext } from '../../../../contexts/SocketContext';
import styles from './Requests.module.css';

export default function Requests (props) {
    
    const {socket, getContacts, getRequests, getMessages} = useContext(SocketContext);
    const [user, setUser] = useState();
    const [accBtt, setAccBtt] = useState('accept');
    const [reBtt, setReBtt] = useState('remove');

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    // accept request
    const acceptRequest = async (event) => {
        event.preventDefault();

        try {
            socket.emit('acceptRequest', {requestSender: user.username}, async (res) => {
                if (res) setAccBtt('accepted');
                await getMessages();
                await getContacts();
                await getRequests();
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // remove request
    const removeRequest = async (event) => {
        event.preventDefault();

        try {
            socket.emit('removeRequest', {requestSender: user.username}, async (res) => {
                if (res) setReBtt('removed');
                await getRequests();
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (<>
        <div className={styles.Requests}>
            <div className={styles.User}>
                <h3>{user ? user.username : ''}</h3>
                <span>{user ? `${user.firstname} ${user.lastname}` : ''}</span>
            </div>
            <div className={styles.Request}>
                <button onClick={acceptRequest}>{accBtt}</button>
                <button onClick={removeRequest}>{reBtt}</button>
            </div>
        </div>
    </>);
}