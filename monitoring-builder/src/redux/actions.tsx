import { ADD_SERVICE } from './actionTypes';
import { NodeInfo } from '../interfaces';

export interface AddServiceAction {
    type: typeof ADD_SERVICE;
    payload: NodeInfo;
}

export type ServiceActionTypes = AddServiceAction;

export function addService(newService: NodeInfo): ServiceActionTypes {
    return {
        type: ADD_SERVICE,
        payload: newService,
    };
}
