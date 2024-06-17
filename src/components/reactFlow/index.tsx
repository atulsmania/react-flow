import { useCallback } from 'react';
import { Background, Controls, ReactFlow, addEdge } from 'reactflow';
import type { Node, OnConnect, OnInit } from 'reactflow';

import 'reactflow/dist/style.css';

import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { useNodesContext } from '../../contexts/reactFlowContext/useNodeContext';
import { dataTransferFormat } from '../sidePanel/draggableNodeList';

export default function App() {
    const {
        edges,
        nodes,
        onEdgesChange,
        onNodesChange,
        setEdges,
        setNodes,
        reactFlowWrapper,
        reactFlowInstance,
        setReactFlowInstance,
    } = useNodesContext();

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges],
    );

    const onInit: OnInit = (_reactFlowInstance) => {
        setReactFlowInstance(_reactFlowInstance);
    };

    const allowDrop = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const onDrop = (event: React.DragEvent) => {
        if (!reactFlowWrapper.current) return;
        if (!reactFlowInstance) return;

        const nodeType = event.dataTransfer.getData(dataTransferFormat);
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode: Node = {
            id: Math.random().toString(),
            type: nodeType,
            position: position,
            data: {
                label: 'new node',
                message: 'Send a message to your new node',
            },
            selected: true,
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    return (
        <ReactFlow
            ref={reactFlowWrapper}
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={allowDrop}
            onInit={onInit}
            selectNodesOnDrag={false}
            fitView
        >
            <Background />
            <Controls />
        </ReactFlow>
    );
}
