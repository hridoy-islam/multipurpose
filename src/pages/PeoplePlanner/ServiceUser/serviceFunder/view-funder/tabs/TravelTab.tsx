import React from 'react';
import { EditableField } from '../components/EditableField';

interface TravelTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onSelectChange: (field: string, value: any) => void;
  isFieldSaving: Record<string, boolean>;
}

const travelTypeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Actual', value: 'actual' },
];

const TravelTab: React.FC<TravelTabProps> = ({
  formData,
  onUpdate,
  onSelectChange,

  isFieldSaving,
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Travel Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            id="travelType"
            label="Travel Type"
            value={formData.travelType}
            type="select"
            options={travelTypeOptions}
            onUpdate={(value) => onSelectChange('travelType', value)}
            isSaving={isFieldSaving.travelType}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TravelTab;
