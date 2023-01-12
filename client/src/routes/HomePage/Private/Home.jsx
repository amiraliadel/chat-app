import React, {useState, useEffect, useContext} from "react";
import {Outlet} from 'react-router-dom';
import {AuthContext} from "../../../contexts/AuthContext";
import {SocketContext} from "../../../contexts/SocketContext";
import Search from './Search/Search';
import Logs from './Logs/Logs';
import SearchedUser from "./SearchedUser/SearchedUser";
import Requests from "./Requests/Requests";
import Contact from "./Contacts/Contact";
import styles from './Home.module.css';

export default function Home () {

    const {username, showReqs} = useContext(AuthContext);
    const {requests, contacts, getContacts} = useContext(SocketContext);
    const [userRequests, setUserRequests] = useState([]);
    const [userContacts, setUserContacts] = useState();
    const [logs, setLogs] = useState();
    const [isErr, setIsErr] = useState(false);
    const [searchedUser, setSearchedUser] = useState();
    const [isFound, setIsFound] = useState(false);

    useEffect(() => {
        //setUser(userData);
    }, [showReqs, isErr]);

    useEffect(() => {
        setUserRequests(requests);
    }, [requests]);

    useEffect(() => {
        setUserContacts(contacts);
    }, [contacts]);

    useEffect(() => {
        (async () => {
            await getContacts();
        })();
    }, []);

    const handleLogs = async (err, logs) => {
        setIsErr(err);
        if (err) setLogs(logs);
    }

    const handleSearchedUser = async (found, searchedUser) => {
        setIsFound(found);
        if (found) setSearchedUser(searchedUser);
    }

    return (<>
        <div className={styles.Sidebar}>
            <Search handleLogs={handleLogs} handleSearchedUser={handleSearchedUser} />
            {
                isFound ? 
                    <SearchedUser 
                        handleLogs={handleLogs} 
                        username={searchedUser} 
                        handleSearchedUser={handleSearchedUser}
                    />
                : ''
            }
            
            {
                isErr ? 
                    <Logs logs={logs}/> 
                : ''
            }
            {
                (showReqs && userRequests) ? 
                userRequests.map(req => <Requests 
                                                user={req} 
                                                key={req.username} 
                                                handleLogs={handleLogs}
                                             />) 
                : ''
            }
            <div className={styles.Contacts}>
                {
                    userContacts ? userContacts.map(contact => <Contact contact={contact} username={username} key={contact._id}/>) : '' 
                }
            </div>
        </div>
        <div className={styles.Content}>
            <Outlet />
        </div>
    </>);
}