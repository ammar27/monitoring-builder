import * as React from 'react';

export const NODE_KEY = 'id'; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'customEmpty'; // Empty node type
export const DEFAULT_TYPE = 'default';
export const HEALTHY_TYPE = 'healthy';
export const UNHEALTHY_TYPE = 'unhealthy';

export const EMPTY_EDGE_TYPE = 'emptyEdge';

export const nodeTypes = [DEFAULT_TYPE, EMPTY_TYPE, HEALTHY_TYPE, UNHEALTHY_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE];

const EmptyNodeShape = (
    <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
        <circle cx="77" cy="77" r="76" />
    </symbol>
);

const CustomEmptyShape = (
    <symbol viewBox="0 0 100 100" id="customEmpty">
        <circle cx="50" cy="50" r="45" />
    </symbol>
);

const DefaultShape = (
    <symbol viewBox="0 0 100 100" id="default">
        <circle cx="50" cy="50" r="45" />
    </symbol>
);

const UnhealthyShape = (
    <symbol viewBox="0 0 100 100" id="unhealthy">
        <circle cx="50" cy="50" r="45" fill="#f54242" stroke="#f54242" />
    </symbol>
);

const HealthyShape = (
    <symbol viewBox="0 0 100 100" id="healthy">
        <circle cx="50" cy="50" r="45" fill="#42f58d" stroke="#42f58d" />
    </symbol>
);

const SpecialChildShape = (
    <symbol viewBox="0 0 154 154" id="specialChild">
        <rect x="2.5" y="0" width="154" height="154" fill="rgba(30, 144, 255, 0.12)" />
    </symbol>
);

const EmptyEdgeShape = (
    <symbol viewBox="0 0 50 50" id="emptyEdge">
        <circle cx="25" cy="25" r="8" fill="currentColor" />
    </symbol>
);

export default {
    EdgeTypes: {
        emptyEdge: {
            shape: EmptyEdgeShape,
            shapeId: '#emptyEdge',
        },
    },
    NodeSubtypes: {
        specialChild: {
            shape: SpecialChildShape,
            shapeId: '#specialChild',
        },
    },
    NodeTypes: {
        emptyNode: {
            shape: EmptyNodeShape,
            shapeId: '#emptyNode',
            typeText: 'None',
        },
        default: {
            shape: DefaultShape,
            shapeId: '#default',
            typeText: '',
        },
        unhealthy: {
            shape: UnhealthyShape,
            shapeId: '#unhealthy',
            typeText: '',
        },
        healthy: {
            shape: HealthyShape,
            shapeId: '#healthy',
            typeText: '',
        },
        empty: {
            shape: CustomEmptyShape,
            shapeId: '#empty',
            typeText: 'None',
        },
    },
};
