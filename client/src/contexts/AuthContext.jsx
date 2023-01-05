import React, {createContext, useState} from 'react';

const AuthContext = createContext();

function AuthProvider ({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

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