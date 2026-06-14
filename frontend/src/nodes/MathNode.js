import React from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Math"
    accent={['#db2777', '#f472b6']}
    inputs={[
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
    ]}
    outputs={[{ id: 'result' }]}
    fields={[
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'add',
        options: [
          { value: 'add', label: 'Add (a + b)' },
          { value: 'subtract', label: 'Subtract (a - b)' },
          { value: 'multiply', label: 'Multiply (a * b)' },
          { value: 'divide', label: 'Divide (a / b)' },
        ],
      },
    ]}
  />
);
