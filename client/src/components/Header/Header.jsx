import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {PublicHeader, PrivateHeader} from './index';

export default function Header () {
    const {loggedIn} = useContext(AuthContext);

    return (<>
        {loggedIn ? <PrivateHeader/>: <PublicHeader/>}
    </>);
}