import React, {useState, useEffect} from "react";
import styles from './Guidance.module.css';

export default function Guidance (props) {
    const [msg, setMsg] = useState();
    const [condition, setCondition] = useState(true);

    // return seconds from 0 to 19.
    const seconds = () => {
        return Math.floor(Date.now() / 1000) % 20;
    }

    // set msg from props.
    useEffect(() => {
        setMsg(props.msg);
    }, [props.msg]);

    // set the condition to false to unhide the guidance panel.
    useEffect(() => {
        // set an interval to get the time every second.
        const interval = setInterval(() => {
            if (seconds() === 19) {
                setCondition(false);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // set condition to false to hide guidance panel.
    const handleCloseButton = (e) => {
        setMsg('');
        setCondition(false);
    }

    return (<>{
            condition ?
            <div className={styles.Guidance}>
                <h2>{msg}</h2>
                <span onClick={handleCloseButton}>x</span>
            </div> : <div></div>
        }</>);
}