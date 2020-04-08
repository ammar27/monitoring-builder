import React from 'react';
import { connect } from 'react-redux';
import { NodeInfo } from '../interfaces';
import './panel.css';

interface PanelProps {
    addService: (nodeInfo: NodeInfo) => void;
}

const mapDispatch = {
    addService: (nodeInfo: NodeInfo) => ({ type: 'ADD_SERVICE', payload: nodeInfo }),
};

class Panel extends React.Component<PanelProps> {
    createService = () => {
        const newNode: NodeInfo = {
            Id: '1',
            Name: 'Service A',
        };

        this.props.addService(newNode);
    };

    render() {
        return (
            <div>
                <div className="header">Control Panel</div>
                <div className="section">
                    <button onClick={this.createService}>Create Service</button>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatch)(Panel);
