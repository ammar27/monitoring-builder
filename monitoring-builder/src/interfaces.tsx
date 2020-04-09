import { IEdge, INode, LayoutEngineType } from 'react-digraph';

export interface NodeInfo {
    Id: string;
    Name: string;
    Url?: string;
}

export interface GraphState {
    graph: GraphElements;
    selected: any;
    totalNodes: number;
    copiedNode: any;
    layoutEngineType?: LayoutEngineType;
}

export interface GraphElements {
    nodes: INode[];
    edges: IEdge[];
}
