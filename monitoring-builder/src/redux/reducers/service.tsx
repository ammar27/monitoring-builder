import { ADD_SERVICE } from '../actionTypes';
import { ServiceActionTypes } from '../actions';

const initialState = {
    allIds: [],
    byIds: {},
};

export default function (state = initialState, action: ServiceActionTypes) {
    switch (action.type) {
        case ADD_SERVICE: {
            const { Id, Name } = action.payload;

            return {
                ...state,
                allIds: [...state.allIds, Id],
                byIds: {
                    ...state.byIds,
                    [Id]: {
                        Name,
                    },
                },
            };
        }
        default:
            return state;
    }
}
