import React from 'react';
import './App.css';
import { Panel } from './control-panel/panel';

function App() {
    return (
        <div className="App">
            <div className="panel">
                <Panel></Panel>
            </div>
            <div className="work-area"></div>
        </div>
    );
}

export default App;
