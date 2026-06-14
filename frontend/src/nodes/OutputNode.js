import React from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const nodeName = data?.outputName || id.replace('customOutput-', 'output_');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      accent={['#2563eb', '#60a5fa']}
      inputs={[{ id: 'value' }]}
      fields={[
        {
          name: 'outputName',
          label: 'Name',
          type: 'text',
          defaultValue: nodeName,
          placeholder: 'output_name',
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ],
        },
      ]}
    />
  );
};
