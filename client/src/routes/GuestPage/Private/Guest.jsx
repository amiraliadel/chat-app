import React from "react";
import Guidance from "../../../components/Shared/Guidance/Guidance";
import styles from './Guest.module.css'

export default function Guest () {

    return (<>
        <div></div>
        <Guidance msg="you are currently logged in. if you want to use the app as a guest, please logout first."/>
    </>);
}