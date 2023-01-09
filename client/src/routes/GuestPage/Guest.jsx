import React, {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {PublicGuest, PrivateGuest} from './index';

export default function Guest () {
    const {loggedIn} = useContext(AuthContext);

    return (<>
        {loggedIn ? <PrivateGuest />: <PublicGuest />}
    </>);
}