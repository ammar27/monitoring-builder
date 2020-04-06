import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Panel } from './control-panel/panel';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Code Test</p>
                <Panel></Panel>
            </header>
        </div>
    );
}

export default App;
