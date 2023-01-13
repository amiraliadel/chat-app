import React, {useState, useEffect, useContext} from "react";
import {SocketContext} from "../../../../contexts/SocketContext";
import {Link} from "react-router-dom";
import {ReactComponent as MessageIcon} from '../../../../imgs/icons/chat_bubble_FILL1_wght300_GRAD200_opsz20.svg';
import styles from './Contact.module.css';

export default function Contact ({contact, username}) {

    const {messages} = useContext(SocketContext);
    const [unreadCount, setUnreadCount] = useState();

    useEffect(() => {
        (() => {
            countUnreadMessages();
        })();
    }, [messages]);

    const countUnreadMessages = () => {
        let count = 0;
        
        messages.forEach(contacts => {
            if (contacts.username === contact.username) contacts.messages.forEach(msg => {
                if (msg.from !== username && msg.read === false) count++;
            });
        });

        setUnreadCount(count);
    }

    return (<>
        <div className={styles.Contact}>
            <Link to={`/chats/${contact.username}`}>
                <h3>{contact.username}</h3>
                <div className={styles.Message}>
                    <MessageIcon />
                    <span>{unreadCount ? unreadCount : 0}</span>
                </div>
            </Link>
        </div>
    </>);
}