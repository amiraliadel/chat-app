import React, {useState, useEffect, useContext} from "react";
import { SocketContext } from "../../../../contexts/SocketContext";
import styles from './SearchedUser.module.css';

export default function SearchedUser ({username, handleSearchedUser}) {
    const {socket} = useContext(SocketContext);
    const [user, setUser] = useState();
    const [sendBtt, setSendBtt] = useState('send request');
    useEffect(() => {

        setUser(username);

    }, [username, sendBtt]);

    // send request
    const sendRequest = async () => {

        try {
            console.log(user);
            socket.emit('sendRequest', {requestTo: user.username}, async (res) => {

                if (res) setSendBtt('sended');
                setTimeout(() => {
                    handleSearchedUser(false, '');
                }, 500);
                
            });

        } catch (err) {

            console.log(err.message);
        }
        
    }
    
    return (<>
        <div className={styles.SearchedUser}>
            {(() => {
                if (user) {
                    return (<>
                        <div className={styles.User}>
                            <h3>{user.username}</h3>
                            <span>{`${user.firstname} ${user.lastname}`}</span>
                        </div>
                        <div className={styles.Request}>
                            <button onClick={sendRequest}>{sendBtt}</button>
                        </div>
                    </>);
                }
            })()}        
        </div>
    </>);
}