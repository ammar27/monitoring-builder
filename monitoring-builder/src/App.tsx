import React from 'react';
import './App.css';
import Panel from './control-panel/panel';
import Graph from './graph/graph';

function App() {
    return (
        <div className="App">
            <div className="panel">
                <Panel></Panel>
            </div>
            <div className="work-area">
                <Graph nodes={[]} edges={[]}></Graph>
            </div>
        </div>
    );
}

export default App;
