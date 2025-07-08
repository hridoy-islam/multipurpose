import React from 'react';
import { EditableField } from '../components/EditableField';

interface MiscellaneousTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onDateChange: (field: string, value: string) => void;
  onSelectChange: (field: string, value: any) => void;
  isFieldSaving: Record<string, boolean>;
}

const MiscellaneousTab: React.FC<MiscellaneousTabProps> = ({
  formData,
  onUpdate,
  onDateChange,
  onSelectChange,
  isFieldSaving,
}) => {
  const booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Employment and Service Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            id="serviceLocationExId"
            label="Service Location Ex ID"
            value={formData.serviceLocationExId || ''}
            type="text"
            onUpdate={(value) => onUpdate('serviceLocationExId', value)}
            isSaving={isFieldSaving.serviceLocationExId}
            required
          />

          <EditableField
            id="timesheetSignature"
            label="Timesheet Signature Required"
            value={formData.timesheetSignature}
            type="select"
            options={booleanOptions}
            onUpdate={(value) => onSelectChange('timesheetSignature', value)}
            isSaving={isFieldSaving.timesheetSignature}
            required
          />
        </div>

        {formData.timesheetSignature === true && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <EditableField
              id="timesheetSignatureNote"
              label="Timesheet Signature Not Required Note"
              value={formData.timesheetSignatureNote || ''}
              type="textarea"
              onUpdate={(value) => onUpdate('timesheetSignatureNote', value)}
              isSaving={isFieldSaving.timesheetSignatureNote}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiscellaneousTab;
