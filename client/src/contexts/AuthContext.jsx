import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
const AuthContext = createContext();

function AuthProvider ({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState('');
    const [showReqs, setShowReqs] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('https://chat-app-server-1ewb.onrender.com/users/userData', {
                    withCredentials: true
                });
                if (res.data.success) {
                    handleLogin(true, res.data.user.username);
                    setUserData(res.data.user);
                } 
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, []);

    // handle login.
    const handleLogin = (isLoggedIn, username) => {
        setLoggedIn(isLoggedIn);
        isLoggedIn ? setUsername(username) : setUsername('');
    }
    // display requests.
    const showRequests = () => {
        showReqs ? setShowReqs(false) : setShowReqs(true); 
        
    }
    // update requests
    const updateRequests = (requests) => {
        setUserData({...userData, requests: requests});
    }
    // update contacts
    const updateContacts = (contacts, requests) => {
        setUserData({...userData, contacts: contacts, requests: requests});
    }
    return (
        <AuthContext.Provider 
            value={{
                loggedIn,
                username,
                userData,
                showReqs,
                handleLogin, 
                showRequests, 
                updateRequests, 
                updateContacts,
                }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};