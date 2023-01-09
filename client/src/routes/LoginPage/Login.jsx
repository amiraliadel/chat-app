import React, {useState, useContext} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Log from "../../components/Shared/Log/Log";
import styles from './Login.module.css';

export default function Login () {
    const [errors, setErrors] = useState();
    const {handleLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const loginUser = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        try {
            const res = await axios.post('http://localhost:3003/users/login', data, {
                withCredentials: true
            });
            if (res.data.success) {
                setErrors('');
                handleLogin(true, res.data.username);
                navigate('/');
            }
        } catch (err) {
            setErrors(err.response.data.server_message);
        }
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
                {(() => {
                    if (errors) {
                        return (errors.map(err => <Log msg={err.msg} key={err.msg} />));
                    }
                })()}
            </form>
        </div>
    </>);
}
