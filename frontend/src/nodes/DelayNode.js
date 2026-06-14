import React from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Delay"
    accent={['#475569', '#94a3b8']}
    inputs={[{ id: 'input' }]}
    outputs={[{ id: 'output' }]}
    fields={[
      {
        name: 'duration',
        label: 'Duration (seconds)',
        type: 'text',
        defaultValue: '1',
        placeholder: '1',
      },
    ]}
  />
);
