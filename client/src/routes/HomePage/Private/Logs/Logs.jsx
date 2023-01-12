import React, {useState, useEffect} from "react";
import Log from "../../../../components/Shared/Log/Log";
import styles from './Logs.module.css';

export default function Logs (props) {
    const [logs, setLogs] = useState('');

    useEffect(() => {
        setLogs(props.logs);
    }, [props.logs]);

    return (<>
        <div className={styles.Logs}>
            {(() => {
                if (logs) return (logs.map(log => <Log msg={log.msg} key={log.msg}/>))
            })()}
        </div>
    </>);
}