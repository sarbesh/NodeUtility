import React, {useState} from "react";
import './SideNav.css';

const SideNav = (props) => {
    return (
        <div className="SideNav" style={{width: props.width, paddingTop: `20px` }}>
            <button onClick={props.closeNav}>X</button>
            <a href="#">{props.name}</a>
            <a href="#">Investment</a>
            <a href="#">Expenses</a>
            <a href="#">Tax</a>
            <a href="#">About</a>
        </div>
    );
};

export default SideNav;