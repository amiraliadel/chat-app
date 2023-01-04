import React, {useState, useEffect} from "react";
import styles from './Log.module.css';

export default function (props) {
    const [msg, setMsg] = useState();

    useEffect(() => {
        setMsg(props.msg);
    }, [props.msg]);

    return (<>
        <div className={styles.Log}>
            <p>{msg}</p>
        </div>
    </>);
}