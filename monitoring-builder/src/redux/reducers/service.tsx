import { ADD_SERVICE } from '../actionTypes';
import { ServiceActionTypes } from '../actions';
import { GraphElements } from '../../interfaces';
import { DEFAULT_TYPE } from '../../graph/graph-config'; // Configures node/edge types

const initialState: GraphElements = {
    nodes: [
        {
            id: 'start1',
            title: 'Start (0)',
            type: DEFAULT_TYPE,
        },
    ],
    edges: [],
};

export default function (state = initialState, action: ServiceActionTypes): GraphElements {
    switch (action.type) {
        case ADD_SERVICE: {
            const { Id, Name } = action.payload;
            const newState = {
                ...state,
                nodes: [...state.nodes, { id: Id, title: Name, type: DEFAULT_TYPE }],
                edges: [...state.edges],
            };

            return newState;
        }
        default:
            return state;
    }
}
