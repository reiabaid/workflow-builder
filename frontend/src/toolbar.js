import React from 'react';
import './toolbar.css';

const NODE_TYPES = [
  { type: 'customInput',  label: 'Input',       color: '#059669' },
  { type: 'llm',          label: 'LLM',         color: '#7c3aed' },
  { type: 'text',         label: 'Text',        color: '#b45309' },
  { type: 'customOutput', label: 'Output',      color: '#2563eb' },
  { type: 'math',         label: 'Math',        color: '#db2777' },
  { type: 'filter',       label: 'Filter',      color: '#c2410c' },
  { type: 'delay',        label: 'Delay',       color: '#475569' },
  { type: 'apiRequest',   label: 'API Request', color: '#0e7490' },
  { type: 'conditional',  label: 'Conditional', color: '#be123c' },
];

export const PipelineToolbar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="toolbar">
      <div className="toolbar-title">Nodes</div>
      <div className="toolbar-items">
        {NODE_TYPES.map(({ type, label, color }) => (
          <div
            key={type}
            className="toolbar-item"
            style={{ '--item-color': color }}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
