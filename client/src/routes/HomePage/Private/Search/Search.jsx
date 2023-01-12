import React, {useState} from 'react';
import axios from 'axios';
import styles from './Search.module.css';
//import Log from '../../../../components/Shared/Log/Log';

export default function Search (props) {
    const [input, setInput] = useState('');
    const searchUser = async event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {username: formData.get('username')};

        try {
            const res = await axios.post('/users/search', data, {
                withCredentials: true
            });
            if (res.data.success) {
                props.handleSearchedUser(true, res.data.user);
            }
        } catch (err) {
            //setErrors(err.response.data.server_message);
            props.handleLogs(true, err.response.data.server_message);
        }
    }

    // handle input
    const handleInput = event => {
        setInput(event.target.value);
    }
    // clear input
    const clearInput = () => {
        setInput('');
    }
    // clear logs
    const clearLogs = () => {
        props.handleLogs(false, '');
    }
    // clear searched user
    const clearSearchedUser = () => {
        props.handleSearchedUser(false, '');
    }
    return (<>
        <div className={styles.Search}>
            <form onSubmit={searchUser}>
                <div>
                    <label htmlFor="username">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="search users" 
                            value={input} 
                            onClick={event => {clearInput(); clearLogs(); clearSearchedUser()}} 
                            onChange={handleInput}/>
                    </label>
                    <label htmlFor="submit">
                        <button type="submit" name="submit" >search</button>
                    </label>
                </div>
            </form>
        </div>
    </>);
}