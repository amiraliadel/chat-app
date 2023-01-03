import React from "react";
import {Outlet} from "react-router-dom";
import styles from './Auth.module.css';

export default function Auth () {
    
    return (<>
    <div></div>
        <div className={styles.Auth}>
            <Outlet />
        </div>
    </>);
}