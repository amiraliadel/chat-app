import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
const AuthContext = createContext();

function AuthProvider ({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/users/userData', {
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
    });

    // handle login.
    const handleLogin = (isLoggedIn, username) => {
        setLoggedIn(isLoggedIn);
        isLoggedIn ? setUsername(username) : setUsername('');
    }

    return (
        <AuthContext.Provider 
            value={{
                loggedIn,
                username,
                handleLogin
                }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};