import React, {createContext, useState} from 'react';

const AuthContext = createContext();

function AuthProvider ({children}) {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider 
            value={{loggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};