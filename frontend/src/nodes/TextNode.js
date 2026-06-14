import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import './nodes.css';

const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const _measureCtx = document.createElement('canvas').getContext('2d');
const measureTextWidth = (text) => {
  _measureCtx.font = '12px Inter, system-ui, -apple-system, sans-serif';
  return Math.max(0, ...text.split('\n').map((line) => _measureCtx.measureText(line).width));
};

const extractVariables = (text) => {
  const matches = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    matches.add(match[1]);
  }
  return Array.from(matches);
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const removeEdgesForNode = useStore((state) => state.removeEdgesForNode);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);

  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(extractVariables(text));
  const [size, setSize] = useState({ width: 240, height: 80 });

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.width = 'auto';
    const newHeight = Math.max(60, el.scrollHeight + 4);
    const estWidth = Math.min(420, Math.max(220, measureTextWidth(el.value) + 48));
    setSize({ width: estWidth, height: newHeight });
  };

  useEffect(() => {
    resize();

  }, [text]);

  useEffect(() => {
    const newVars = extractVariables(text);
    setVariables(newVars);
    updateNodeInternals(id);
    removeEdgesForNode(id, newVars);

  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    updateNodeField(id, 'text', value);
  };

  return (
    <div
      className="base-node text-node"
      style={{ '--node-accent': '#b45309', width: size.width, minHeight: size.height + 50 }}
    >
      <div className="base-node-header" style={{ background: 'linear-gradient(135deg, #b45309, #fbbf24)' }}>Text</div>

      <div className="base-node-body">
        <label className="base-node-field">
          <span className="base-node-field-label">Text</span>
          <textarea
            ref={textareaRef}
            className="base-node-input base-node-textarea"
            style={{ width: size.width - 24, height: size.height }}
            value={text}
            onChange={handleChange}
          />
        </label>
        {variables.length > 0 && (
          <div className="text-node-vars-hint">
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={varName}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
        >
          <span className="handle-label handle-label-left">{varName}</span>
        </Handle>
      ))}

      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};
