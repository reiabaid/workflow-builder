import React from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Conditional"
    accent={['#be123c', '#fb7185']}
    inputs={[{ id: 'condition', label: 'condition' }]}
    outputs={[
      { id: 'true', label: 'true' },
      { id: 'false', label: 'false' },
    ]}
  >
    <div className="llm-node-note">Routes the input to "true" or "false" based on the condition.</div>
  </BaseNode>
);
