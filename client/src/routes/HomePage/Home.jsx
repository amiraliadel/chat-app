import React, {useState} from "react";
import {PublicHome, PrivateHome} from './index';

export default function Home () {
    const [loggedIn, setLoggedIn] = useState(false);
    return (<>
        {loggedIn ? <PrivateHome />: <PublicHome />}
    </>);
}