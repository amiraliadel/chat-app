import React, {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {PublicHome, PrivateHome} from './index';

export default function Home () {
    const {loggedIn} = useContext(AuthContext);

    return (<>
        {loggedIn ? <PrivateHome />: <PublicHome />}
    </>);
}