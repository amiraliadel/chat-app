import React from "react";
import {Link} from "react-router-dom";
import Mobile from '../../../imgs/bg/mobile.png';
import styles from './About.module.css';

export default function About () {

    return (<>
        <div className={styles.About}>
            <div className={styles.Container}>
                <div className={styles.Text}>
                    <h2>text chat application</h2>
                    <p>Chat with your friends in real time. Using Socket.io technology, we deliver your messages as quickly as possible.log in to your account or register one to access all features. alternatively you can use app as a guest.</p>
                </div>
                <div className={styles.Img}>
                    <img src={Mobile} alt="mobile" />
                </div>
                <div className={styles.Links}>
                    <Link to="./auth/login">login</Link>
                    <Link to="./users/register">register</Link>
                    <Link to="./users/guest">guest</Link>
                </div>
            </div>
        </div>
    </>);
}