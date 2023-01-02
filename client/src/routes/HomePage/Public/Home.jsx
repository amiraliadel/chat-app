import React from "react";
import Guidance from "../../../components/Shared/Guidance/Guidance";
import About from "../../../components/Shared/About/About";
import styles from './Home.module.css';

export default function Home () {

    return (<>
        <div></div>
        <div className={styles.Content}>
            <Guidance msg="please log in to your account or register one to access all features. alternatively you can use app as a guest."/>
            <About />
        </div>
    </>);
}