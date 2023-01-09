import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {ReactComponent as LogoutIcon} from '../../../imgs/icons/logout_FILL0_wght700_GRAD0_opsz24.svg';

import styles from './Header.module.css';

export default function Header () {
    const {username} = useContext(AuthContext);

    const logoutUser = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get('/users/logout', {
                withCredentials: true
            });
            if (res.data.success) {
                window.open('/', '_self');
            }
        } catch (err) {
            console.log(`${err.message}. ${err.response.data.server_message}`);
        }
    }

    return (<>
        <header className={styles.Header}>
            <div className={styles.Username}>
                <h2>{username}</h2>
            </div>
            <div className={styles.Logo}>
                <Link to="/">
                    real time chat app
                </Link>
            </div>
            <div className={styles.Icons}>
                <Link onClick={logoutUser}>
                    <LogoutIcon />
                </Link>
            </div>
        </header>
    </>);
}