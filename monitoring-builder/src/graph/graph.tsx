//https://github.com/uber/react-digraph/blob/master/README.md

import React from 'react';
import { GraphView, IEdge, INode } from 'react-digraph';
import GraphConfig, { EMPTY_EDGE_TYPE, DEFAULT_TYPE, UNHEALTHY_TYPE, HEALTHY_TYPE, NODE_KEY } from './graph-config'; // Configures node/edge types
import './graph.css';
import { GraphState, GraphElements } from '../interfaces';

type IGraphProps = {};

// type IGraphState = {
//     graph: any;
//     selected: any;
//     totalNodes: number;
//     copiedNode: any;
//     layoutEngineType?: LayoutEngineType;
// };

// type IGraph = {
//     nodes: INode[];
//     edges: IEdge[];
// };

const sample: GraphElements = {
    edges: [],
    nodes: [
        {
            id: 'start1',
            title: 'Start (0)',
            type: DEFAULT_TYPE,
        },
        {
            id: 'start2',
            title: 'Unhealthy (0)',
            type: UNHEALTHY_TYPE,
        },
        {
            id: 'start3',
            title: 'Healthy (0)',
            type: HEALTHY_TYPE,
        },
    ],
};

export class Graph extends React.Component<IGraphProps, GraphState> {
    GraphView: any;

    constructor(props: IGraphProps) {
        super(props);

        this.state = {
            copiedNode: null,
            graph: sample,
            selected: null,
            totalNodes: sample.nodes.length,
            layoutEngineType: undefined,
        };

        this.GraphView = React.createRef();
    }

    // Helper to find the index of a given node
    getNodeIndex(searchNode: INode | any) {
        return this.state.graph.nodes.findIndex((node: any) => {
            return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    }

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge: IEdge) {
        return this.state.graph.edges.findIndex((edge: any) => {
            return edge.source === searchEdge.source && edge.target === searchEdge.target;
        });
    }

    addStartNode = () => {
        const graph = this.state.graph;

        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [
            {
                id: Date.now(),
                title: 'Node A',
                type: DEFAULT_TYPE,
                x: 0,
                y: 0,
            },
            ...this.state.graph.nodes,
        ];
        this.setState({
            graph,
        });
    };

    deleteStartNode = () => {
        const graph = this.state.graph;

        graph.nodes.splice(0, 1);
        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [...this.state.graph.nodes];
        this.setState({
            graph,
        });
    };

    /*
     * Handlers/Interaction
     */

    // Called by 'drag' handler, etc..
    // to sync updates from D3 with the graph
    onUpdateNode = (viewNode: INode) => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);

        graph.nodes[i] = viewNode;
        this.setState({ graph });
    };

    // Node 'mouseUp' handler
    onSelectNode = (viewNode: INode | null) => {
        // Deselect events will send Null viewNode
        this.setState({ selected: viewNode });
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge: IEdge) => {
        this.setState({ selected: viewEdge });
    };

    // Updates the graph with a new node
    onCreateNode = (x: number, y: number) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = DEFAULT_TYPE;

        const viewNode = {
            id: Date.now(),
            title: 'Service Name',
            type,
            x,
            y,
        };

        graph.nodes = [...graph.nodes, viewNode];
        this.setState({ graph });
    };

    // Deletes a node from the graph
    onDeleteNode = (viewNode: INode, nodeId: string, nodeArr: INode[]) => {
        const graph = this.state.graph;
        // Delete any connected edges
        const newEdges = graph.edges.filter((edge: any, i: any) => {
            console.log(i);
            return edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY];
        });

        console.log(nodeId);

        graph.nodes = nodeArr;
        graph.edges = newEdges;

        this.setState({ graph, selected: null });
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
        const graph = this.state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type,
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges = [...graph.edges, viewEdge];
            this.setState({
                graph,
                selected: viewEdge,
            });
        }
    };

    // Called when an edge is reattached to a different target.
    onSwapEdge = (sourceViewNode: INode, targetViewNode: INode, viewEdge: IEdge) => {
        const graph = this.state.graph;
        const i = this.getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;
        // reassign the array reference if you want the graph to re-render a swapped edge
        graph.edges = [...graph.edges];

        this.setState({
            graph,
            selected: edge,
        });
    };

    // Called when an edge is deleted
    onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
        const graph = this.state.graph;
        console.log(viewEdge);
        graph.edges = edges;
        this.setState({
            graph,
            selected: null,
        });
    };

    onUndo = () => {
        // Not implemented
        console.warn('Undo is not currently implemented in the example.');
        // Normally any add, remove, or update would record the action in an array.
        // In order to undo it one would simply call the inverse of the action performed. For instance, if someone
        // called onDeleteEdge with (viewEdge, i, edges) then an undelete would be a splicing the original viewEdge
        // into the edges array at position i.
    };

    onCopySelected = () => {
        if (this.state.selected.source) {
            console.warn('Cannot copy selected edges, try selecting a node instead.');

            return;
        }

        const x = this.state.selected.x + 10;
        const y = this.state.selected.y + 10;

        this.setState({
            copiedNode: { ...this.state.selected, x, y },
        });
    };

    onPasteSelected = () => {
        if (!this.state.copiedNode) {
            console.warn(
                'No node is currently in the copy queue. Try selecting a node and copying it with Ctrl/Command-C',
            );
        }

        const graph = this.state.graph;
        const newNode = { ...this.state.copiedNode, id: Date.now() };

        graph.nodes = [...graph.nodes, newNode];
        this.forceUpdate();
    };

    onSelectPanNode = (event: any) => {
        if (this.GraphView) {
            this.GraphView.panToNode(event.target.value, true);
        }
    };

    render() {
        const { nodes, edges } = this.state.graph;
        const selected = this.state.selected;
        const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

        return (
            <GraphView
                ref={(el) => (this.GraphView = el)}
                nodeKey={NODE_KEY}
                nodes={nodes}
                edges={edges}
                selected={selected}
                nodeTypes={NodeTypes}
                nodeSubtypes={NodeSubtypes}
                edgeTypes={EdgeTypes}
                onSelectNode={this.onSelectNode}
                onCreateNode={this.onCreateNode}
                onUpdateNode={this.onUpdateNode}
                onDeleteNode={this.onDeleteNode}
                onSelectEdge={this.onSelectEdge}
                onCreateEdge={this.onCreateEdge}
                onSwapEdge={this.onSwapEdge}
                onDeleteEdge={this.onDeleteEdge}
                onUndo={this.onUndo}
                onCopySelected={this.onCopySelected}
                onPasteSelected={this.onPasteSelected}
                layoutEngineType={this.state.layoutEngineType}
            />
        );
    }
}

export default Graph;
