import React from 'react';
import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API Request"
    accent={['#0e7490', '#22d3ee']}
    inputs={[{ id: 'body', label: 'body' }]}
    outputs={[{ id: 'response' }]}
    minWidth={240}
    fields={[
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://api.example.com/endpoint',
      },
    ]}
  />
);
