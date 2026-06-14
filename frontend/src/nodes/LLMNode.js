import React from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      accent={['#7c3aed', '#a78bfa']}
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="llm-node-note">This node runs an LLM call against the given prompt.</div>
    </BaseNode>
  );
};
