import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from './store';
import './ui.css';

import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import { LLMNode } from './nodes/LLMNode';
import { TextNode } from './nodes/TextNode';
import { MathNode } from './nodes/MathNode';
import { FilterNode } from './nodes/FilterNode';
import { DelayNode } from './nodes/DelayNode';
import { APIRequestNode } from './nodes/APIRequestNode';
import { ConditionalNode } from './nodes/ConditionalNode';

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  apiRequest: APIRequestNode,
  conditional: ConditionalNode,
};

const NODE_ACCENT_COLORS = {
  customInput:  '#059669',
  customOutput: '#2563eb',
  llm:          '#7c3aed',
  text:         '#b45309',
  math:         '#db2777',
  filter:       '#c2410c',
  delay:        '#475569',
  apiRequest:   '#0e7490',
  conditional:  '#be123c',
};

const DEFAULT_DATA = {
  text: { text: '{{input}}' },
};

const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const addNode = useStore((state) => state.addNode);
  const getNodeID = useStore((state) => state.getNodeID);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = getNodeID(type);
      const newNode = {
        id,
        type,
        position,
        data: { id, ...(DEFAULT_DATA[type] || {}) },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ maxZoom: 0.75, padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.2}
          color="#2d2d2d"
        />
        <Controls />
        <MiniMap
          pannable
          zoomable
          style={{ background: '#1a1a1a' }}
          nodeColor={(node) => NODE_ACCENT_COLORS[node.type] ?? '#6366f1'}
          maskColor="rgba(0, 0, 0, 0.55)"
        />
      </ReactFlow>
    </div>
  );
};

export const PipelineUI = () => (
  <ReactFlowProvider>
    <PipelineCanvas />
  </ReactFlowProvider>
);
