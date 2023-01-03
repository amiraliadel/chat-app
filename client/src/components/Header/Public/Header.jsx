import React from "react";
import {Link} from 'react-router-dom';
import {ReactComponent as LoginIcon} from '../../../imgs/icons/login_FILL0_wght700_GRAD200_opsz24.svg';
import {ReactComponent as RegisterIcon} from '../../../imgs/icons/app_registration_FILL0_wght700_GRAD200_opsz24.svg';


import styles from './Header.module.css';

export default function Header () {

    return (<>
        <header className={styles.Header}>
            <div className={styles.Logo}>
                <Link to="/">
                    real time chat app
                </Link>
            </div>
            <div className={styles.Icons}>
                <Link to='/auth/login'>
                    <LoginIcon />
                    
                </Link>
                <Link to='/auth/register'>
                    <RegisterIcon />
                </Link>
            </div>
        </header>
    </>);
}