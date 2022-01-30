import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SideNav from './SideNav';

function App() {
  const [wid, setWid] = useState('0%');
    const openSideNav = () => {
        setWid('25%')
    }
    const closeSideNav = () => {
        setWid('0%')
    }
  return (
    <div className="App">
      <button onClick={openSideNav}>Open</button>
      <SideNav width={wid} name='Sarbesh Sarkar' closeNav={closeSideNav}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
