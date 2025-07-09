import React from 'react';
import { EditableField } from '../components/EditableField';

interface TravelDetailTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onSelectChange: (field: string, value: any) => void;
  onDateChange: (field: string, value: string) => void;
  isFieldSaving: Record<string, boolean>;
}

const travelTypeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Actual', value: 'actual' }
];

const linkedInvoiceRateSheetOptions = [
  { label: 'Standard Rate Sheet', value: 'standard' },
  { label: 'Custom Rate Sheet A', value: 'customA' },
  { label: 'Custom Rate Sheet B', value: 'customB' }
];

const TravelRateDetailTab: React.FC<TravelDetailTabProps> = ({
  formData,
  onUpdate,
  onSelectChange,
  onDateChange,
  isFieldSaving
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Travel Rate Sheet
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Date */}
          <EditableField
            id="fromDate"
            label="From Date"
            type="date"
            value={formData.fromDate || ''}
            onUpdate={(value) => onDateChange('fromDate', value)}
            isSaving={isFieldSaving.fromDate}
            required
          />


          {/* Distance */}
          <EditableField
            id="distance"
            label="Distance"
            type="text"
            value={formData.distance || ''}
            onUpdate={(value) => onUpdate('distance', value)}
            isSaving={isFieldSaving.distance}
          />
          {/* Type */}
          <EditableField
            id="type"
            label="Travel Type"
            type="select"
            options={travelTypeOptions}
            value={formData.type}
            onUpdate={(value) => onSelectChange('type', value)}
            isSaving={isFieldSaving.type}
            required
          />

          {/* Reason */}
          <EditableField
            id="reason"
            label="Reason"
            type="textarea"
            value={formData.reason || ''}
            onUpdate={(value) => onUpdate('reason', value)}
            isSaving={isFieldSaving.reason}
          />

          {/* Linked Invoice Rate Sheet */}
          <EditableField
            id="linkedInvoiceRateSheet"
            label="Linked Invoice Rate Sheet"
            type="select"
            options={linkedInvoiceRateSheetOptions}
            value={formData.linkedInvoiceRateSheet}
            onUpdate={(value) => onSelectChange('linkedInvoiceRateSheet', value)}
            isSaving={isFieldSaving.linkedInvoiceRateSheet}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TravelRateDetailTab;
