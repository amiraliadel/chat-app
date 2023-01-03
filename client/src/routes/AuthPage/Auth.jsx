import React, {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {PublicAuth, PrivateAuth} from './index';

export default function Auth () {
    const {loggedIn} = useContext(AuthContext);
    return (<>
        {loggedIn ? <PrivateAuth/>: <PublicAuth/>}
    </>);
}