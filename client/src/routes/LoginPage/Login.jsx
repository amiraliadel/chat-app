import React from "react";
import {Link} from "react-router-dom";
import styles from './Login.module.css';

export default function Login () {


    const loginUser = () => {

    }

    return (<>
        <div className={styles.Container}>
            <div className={styles.Title}>
                <h1>log in to your account</h1>
            </div>
            <form className={styles.Form} onSubmit={loginUser}>
                <div className={styles.Email}>
                    <label htmlFor="email">
                        <input type="text" name="email" placeholder="johndoe@example.com" required />
                    </label>
                </div>
                <div className={styles.Password}>
                    <label htmlFor="password">
                        <input type="password" name="password" placeholder="password" required />
                    </label>
                </div>
                <div className={styles.Submit}>
                    <button type="submit">submit</button>
                    <p>need to register? <Link to="/auth/register">sign up</Link></p>
                </div>
                
            </form>
        </div>
    </>);
}
