import React from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Filter"
    accent={['#c2410c', '#fb923c']}
    inputs={[{ id: 'items' }]}
    outputs={[
      { id: 'matched', label: 'matched' },
      { id: 'unmatched', label: 'unmatched' },
    ]}
    fields={[
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'greater_than', label: 'Greater than' },
          { value: 'less_than', label: 'Less than' },
        ],
      },
      {
        name: 'value',
        label: 'Value',
        type: 'text',
        placeholder: 'comparison value',
      },
    ]}
  />
);
