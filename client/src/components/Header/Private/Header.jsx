import React, {useContext, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../../../contexts/AuthContext";
import {SocketContext} from "../../../contexts/SocketContext";
import {ReactComponent as LogoutIcon} from '../../../imgs/icons/logout_FILL0_wght700_GRAD0_opsz24.svg';
import {ReactComponent as BellIcon} from '../../../imgs/icons/notifications_FILL1_wght300_GRAD200_opsz20.svg';
import {ReactComponent as MessageIcon} from '../../../imgs/icons/chat_bubble_FILL1_wght300_GRAD200_opsz20.svg';

import styles from './Header.module.css';

export default function Header () {
    const {username} = useContext(AuthContext);
    const {userData, showRequests} = useContext(AuthContext);
    const {requests,  getRequests, messages} = useContext(SocketContext);
    const [unreadMessages, setUnreadMessages] = useState();
    const [userRequests, setUserRequests] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(userData);
        setUserRequests(requests);
    }, [userData, requests]);

    useEffect(() => {
        (async () => {
            await getRequests();
        })();
    }, [getRequests]);

    useEffect(() => {
        (() => {
            handleUnreadMessages();
        })();
    }, [messages, unreadMessages]);

    const logoutUser = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get('/users/logout', {
                withCredentials: true
            });
            if (res.data.success) {
                window.open('/', '_self');
            }
        } catch (err) {
            console.log(`${err.message}. ${err.response.data.server_message}`);
        }
    }

    // handle requests.
    const handleRequests = () => {
        
        showRequests();
    }

    const handleUnreadMessages = () => {
        let count = 0;
        if (messages) messages.forEach(contact => contact.messages.forEach(msg => {
            if (msg.from !== user.username && msg.read === false) count++;
        }));
        setUnreadMessages(count);
    }

    return (<>
        <header className={styles.Header}>
            <div className={styles.User}>
                <div className={styles.Username}>
                    <h2>{username}</h2>
                </div>
                <div className={styles.Notification}>
                    <div className={styles.Bell} onClick={handleRequests}>
                        <BellIcon />
                        <span>{(userRequests ? userRequests.length : 0)}</span>
                    </div>
                    <div className={styles.Message}>
                        <MessageIcon />
                        <span>{unreadMessages ? unreadMessages : 0}</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.Logo}>
                <Link to="/">
                    real time chat app
                </Link>
            </div>
            <div className={styles.Icons}>
                <Link onClick={logoutUser}>
                    <LogoutIcon />
                </Link>
            </div>
        </header>
    </>);
}