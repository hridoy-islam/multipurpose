import React from 'react';
import { EditableField } from '../components/EditableField';

interface Tag {
  tag: string;
  message: string;
  deliveryDuration: number | null;
  deliveryOption: string;
}

interface TagTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isFieldSaving: Record<string, boolean>;
}

const TagTab: React.FC<TagTabProps> = ({
  formData,
  onUpdate,
  isFieldSaving
}) => {
  const tags: Tag[] = formData.tags || [];

  // Define options
  const tagOptions = [
    { value: 'Please call office', label: 'Please call office' },
    { value: 'Out of stock', label: 'Out of stock' },
    { value: 'Custom tag', label: 'Custom tag' },
    { value: 'Urgent', label: 'Urgent' },
    { value: 'Fragile', label: 'Fragile' }
  ];

  const deliveryOptionOptions = [
    { value: 'Before', label: 'Before' },
    { value: 'After', label: 'After' },
    { value: 'On time', label: 'On time' },
    { value: 'ASAP', label: 'ASAP' }
  ];

  const updateTagField = <K extends keyof Tag>(
    index: number,
    field: K,
    value: Tag[K]
  ) => {
    const updated = [...tags];
    updated[index][field] = value;
    onUpdate('tags', updated);
  };

  const addNewTag = () => {
    const updated = [
      ...tags,
      {
        tag: '',
        message: '',
        deliveryDuration: null,
        deliveryOption: ''
      }
    ];
    onUpdate('tags', updated);
  };

  const removeTag = (index: number) => {
    const updated = [...tags];
    updated.splice(index, 1);
    onUpdate('tags', updated);
  };

  return (
    <div className="space-y-8">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tag #{index + 1}
            </h3>
            <button
              onClick={() => removeTag(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EditableField
              id={`tag-${index}`}
              label="Tag"
              value={tag.tag}
              type="select"
              options={tagOptions}
              onUpdate={(val) => updateTagField(index, 'tag', val)}
              isSaving={isFieldSaving[`tag-${index}`]}
              required
            />
            
            <EditableField
              id={`deliveryOption-${index}`}
              label="Delivery Option"
              value={tag.deliveryOption}
              type="select"
              options={deliveryOptionOptions}
              onUpdate={(val) => updateTagField(index, 'deliveryOption', val)}
              isSaving={isFieldSaving[`deliveryOption-${index}`]}
              required
            />

            <EditableField
              id={`deliveryDuration-${index}`}
              label="Delivery Duration (minutes)"
              value={tag.deliveryDuration}
              type="number"
              onUpdate={(val) => updateTagField(index, 'deliveryDuration', Number(val) || null)}
              isSaving={isFieldSaving[`deliveryDuration-${index}`]}
            />

            <div className="md:col-span-2">
              <EditableField
                id={`message-${index}`}
                label="Message"
                value={tag.message}
                type="textarea"
                onUpdate={(val) => updateTagField(index, 'message', val)}
                isSaving={isFieldSaving[`message-${index}`]}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addNewTag}
          className="mt-4 rounded bg-supperagent px-4 py-2 text-white hoverbg-supperagent/90"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagTab;