import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";
import {ReactComponent as LogoutIcon} from '../../../imgs/icons/logout_FILL0_wght700_GRAD0_opsz24.svg';

import styles from './Header.module.css';

export default function Header () {
    const {username} = useContext(AuthContext);
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
                <Link to='/auth/login'>
                    <LogoutIcon />
                </Link>
            </div>
        </header>
    </>);
}