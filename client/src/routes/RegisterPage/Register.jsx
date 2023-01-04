import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Register.module.css';

export default function Register () {
    const [result, setResult] = useState({msg: '', success: false});
    const [errors, setErrors] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

    }, [result, errors]);

    const registerUser = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        try {
            const res = await axios.post('/users/register', data);
            if (res.data.success) {
                setResult({msg: 'you are registered and you will be redirected to log in page soon.', success: true});
            }
        } catch (err) {
            setErrors(err.response.data.server_message);
        }
    }
    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }
    const matchPassword = async () => {
        if (password !== confirmPassword) {
            setErrors([{msg: 'password does not match.', key: 'no match'}]);
        }
        else {
            setErrors('');
        }
    }

    return (<>
        <div className={styles.Container}>
            <div className={styles.Title}>
                <h1>create your account</h1>
            </div>
            <form className={styles.Form} onSubmit={registerUser}>
                <div className={styles.Name}>
                    <label htmlFor="firstname">
                        <input type="text" name="firstname" placeholder="first name" required />
                    </label>
                    <label htmlFor="lastname">
                        <input type="text" name="lastname" placeholder="last name" required />
                    </label>
                </div>
                <div className={styles.Username}>
                    <label htmlFor="username">
                        <input type="text" name="username" placeholder="user name" required />
                    </label>
                </div>
                <div className={styles.Email}>
                    <label htmlFor="email">
                        <input type="text" name="email" placeholder="email" required />
                    </label>
                </div>
                <div className={styles.Password}>
                    <label htmlFor="password">
                        <input type="password" name="password" placeholder="password" required onChange={handlePassword}/>
                    </label>
                    <label htmlFor="confirmPassword">
                        <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleConfirmPassword} onKeyUp={matchPassword} />
                    </label>
                </div>
                <div className={styles.Submit}>
                    <button type="submit">submit</button>
                    <p>do you have an account? <Link to="/auth/login">log in</Link></p>
                </div>
                {(() => {
                    if (errors) {
                        //return (errors.map(err => <Log msg={err.msg} key={err.msg}/>));
                    }
                    if (result.success) {
                        setTimeout(() => {
                            navigate('/auth/login', {replace: true});
                        }, 2000);
                        //return (<Log msg={result.msg} key={result.msg}/>);
                    }
                })()}
            </form>
        </div>
    </>);
}