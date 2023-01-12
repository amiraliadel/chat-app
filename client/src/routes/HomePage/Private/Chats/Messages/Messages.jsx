import React, {useState, useEffect, useContext, useRef} from "react";
import {SocketContext} from "../../../../../contexts/SocketContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Messages.module.css';

export default function Messages ({messages, contact}) {
    const {socket} = useContext(SocketContext);
    const [msgs, setMsgs] = useState([]);
    const bottom = useRef(null);

    useEffect(() => {
        setMsgs(messages);
        handleScroll();
    }, [messages]);

    const handleScroll = () => {
        setTimeout(() => {
            if (bottom.current !== null) bottom.current.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
    // readed message
    const readMessage = async (id) => {
        console.log('msg.read is false');
        console.log('msg.id:', id);
        try {

            socket.emit('readMessage', {id: id, contact: contact});

        } catch (err) {
            console.log(err.message);
        }
    }

    return (<>
        <div className={styles.Messages}>   
            {
                msgs !== undefined ? (
                    msgs.map((msg, index) => {
                        let style = '';
                        switch (msg.from) {
                            case 'system':
                                style = 'System';
                                break;
                            case `${contact}`:
                                style = 'Contact';
                                if (msg.read === false) {
                                    readMessage(msg._id);
                                }
                                break;
                            default: style = 'User';
                        }
                        let date = new Date(msg.timestamp);
                        date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                        
                        return (
                            <div className={styles.Message} key={msg._id}>
                                <div className={styles[`${style}`]}>
                                    <div className={styles.Body}>
                                        <p>{msg.body}</p>
                                    </div>
                                    <div className={styles.Detail}>
                                        <span>{date}</span>
                                        {   
                                            (msg.from === 'system') ? 
                                            '' :
                                                (msg.read === true) ? 
                                                    <FontAwesomeIcon icon={solid('check-double')} className={styles.Icons} /> 
                                                    : 
                                                    <FontAwesomeIcon icon={solid('check')} className={styles.Icons} />
                                        }
                                    </div>
                                </div>
                                {((msgs.length -1) === index) ? <div ref={bottom} /> : ''}
                            </div>
                        );
                    })
                ) : ''
            }  
        </div>
    </>);
}
