import React, {useState} from "react";
import {PublicHeader, PrivateHeader} from './index';

export default function Header () {
    const [loggedIn, setLoggedIn] = useState(false);

    return (<>
        {loggedIn ? <PrivateHeader/>: <PublicHeader/>}
    </>);
}