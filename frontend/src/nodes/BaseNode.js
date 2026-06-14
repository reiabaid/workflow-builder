import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodes.css';

export const BaseNode = ({
  id,
  data = {},
  title,
  inputs = [],
  outputs = [],
  fields = [],
  accent,
  width,
  minWidth,
  minHeight,
  children,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const headerStyle = accent
    ? { background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }
    : {};

  return (
    <div
      className="base-node"
      style={{
        '--node-accent': accent?.[0] ?? '#6366f1',
        width: width ?? undefined,
        minWidth: minWidth ?? 200,
        minHeight: minHeight ?? 'auto',
      }}
    >
      <div className="base-node-header" style={headerStyle}>{title}</div>

      <div className="base-node-body">
        {fields.map((field) => {
          const value = data[field.name] ?? field.defaultValue ?? '';
          return (
            <label key={field.name} className="base-node-field">
              {field.label && <span className="base-node-field-label">{field.label}</span>}
              {field.type === 'select' ? (
                <select
                  className="base-node-input"
                  value={value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  {(field.options || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  className="base-node-input base-node-textarea"
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : (
                <input
                  className="base-node-input"
                  type="text"
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </label>
          );
        })}

        {children}
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
            ...(input.style || {}),
          }}
        >
          {input.label && <span className="handle-label handle-label-left">{input.label}</span>}
        </Handle>
      ))}

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
            ...(output.style || {}),
          }}
        >
          {output.label && <span className="handle-label handle-label-right">{output.label}</span>}
        </Handle>
      ))}
    </div>
  );
};
