import React from "react";
import logo from './../../assets/icons/React.svg';
import './React.css';

const ReactPage = (props) => {
    return (
        <div className="React">
        <header className="React-header">
          <img src={logo} className="React-logo" alt="react logo" />
          <p>
            Edit <code>src/React.js</code> and save to reload.
          </p>
          <a
            className="React-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
};

export default ReactPage;