import React from 'react';
import './panel.css';

export class Panel extends React.Component {
    render() {
        return (
            <div>
                <div className="header">Control Panel</div>
                <div className="section">
                    <button>Create Service</button>
                </div>
            </div>
        );
    }
}
