import React from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const nodeName = data?.inputName || id.replace('customInput-', 'input_');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      accent={['#059669', '#34d399']}
      outputs={[{ id: 'value' }]}
      fields={[
        {
          name: 'inputName',
          label: 'Name',
          type: 'text',
          defaultValue: nodeName,
          placeholder: 'input_name',
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ],
        },
      ]}
    />
  );
};
