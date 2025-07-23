import React from 'react';
import moment from 'moment';
import { countries } from '@/types';
import { EditableField } from '../components/EditableField';

interface GeneralInfoTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onDateChange: (field: string, value: string) => void;
  onSelectChange: (field: string, value: string) => void;
  isFieldSaving: Record<string, boolean>;
  getMissingFields: (tab: any, formData: Record<string, any>) => string[];
}

const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({
  formData,
  onUpdate,
  onDateChange,
  onSelectChange,
  isFieldSaving,
  getMissingFields
}) => {
  const missingFields = getMissingFields('general', formData);

  const isFieldMissing = (fieldKey: string) => {
    return missingFields.includes(fieldKey);
  };

  // Calculate duration based on start and end times
  const calculateDuration = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '';
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    const duration = moment.duration(end.diff(start)).asMinutes();
    return `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Date & Time Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Date & Time
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="date"
            label="Date"
            value={formData.date}
            type="date"
            onUpdate={(value) => onDateChange('date', value)}
            isSaving={isFieldSaving.date}
            required
            isMissing={isFieldMissing('date')}
          />
          <EditableField
            id="startTime"
            label="Start Time"
            value={formData.startTime}
            type="time"
            onUpdate={(value) => onUpdate('startTime', value)}
            isSaving={isFieldSaving.startTime}
            required
            isMissing={isFieldMissing('startTime')}
          />
          <EditableField
            id="endTime"
            label="End Time"
            value={formData.endTime}
            type="time"
            onUpdate={(value) => onUpdate('endTime', value)}
            isSaving={isFieldSaving.endTime}
            required
            isMissing={isFieldMissing('endTime')}
          />
          <EditableField
            id="duration"
            label="Duration"
            value={calculateDuration(formData.startTime, formData.endTime)}
            readOnly
            isSaving={false}
          />
          <EditableField
            id="timeInMinutes"
            label="Time (Minutes)"
            value={formData.timeInMinutes}
            type="number"
            onUpdate={(value) => onUpdate('timeInMinutes', value)}
            isSaving={isFieldSaving.timeInMinutes}
            required
            isMissing={isFieldMissing('timeInMinutes')}
          />
        </div>
      </div>

      {/* Travel Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Travel
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="travelTime"
            label="Time (Minutes)"
            value={formData.travelTime}
            type="number"
            onUpdate={(value) => onUpdate('travelTime', value)}
            isSaving={isFieldSaving.travelTime}
            required
            isMissing={isFieldMissing('travelTime')}
          />
        </div>
      </div>

      {/* Service User & Service Funder Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Service User & Service Funder
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="branch"
            label="Branch"
            value={formData.branch}
            type="select"
            options={[
              { value: 'Everycare Romford', label: 'Everycare Romford' },
              // Add more branches as needed
            ]}
            onUpdate={(value) => onSelectChange('branch', value)}
            isSaving={isFieldSaving.branch}
            required
            isMissing={isFieldMissing('branch')}
          />
          <EditableField
            id="area"
            label="Area"
            value={formData.area}
            type="select"
            options={[
              { value: 'Care', label: 'Care' },
              // Add more areas as needed
            ]}
            onUpdate={(value) => onSelectChange('area', value)}
            isSaving={isFieldSaving.area}
            required
            isMissing={isFieldMissing('area')}
          />
          <EditableField
            id="serviceUser"
            label="Service User"
            value={formData.serviceFunder}
            type="select"
            options={[
              { value: 'Hasan Mahi', label: 'Hasan Mahi' },
              // Add more funders as needed
            ]}
            onUpdate={(value) => onSelectChange('serviceUser', value)}
            isSaving={isFieldSaving.serviceFunder}
            required
            isMissing={isFieldMissing('serviceUser')}
          />
          <EditableField
            id="serviceFunder"
            label="Service Funder"
            value={formData.serviceFunder}
            type="select"
            options={[
              { value: 'Independent Living Agency', label: 'Independent Living Agency' },
              // Add more funders as needed
            ]}
            onUpdate={(value) => onSelectChange('serviceFunder', value)}
            isSaving={isFieldSaving.serviceFunder}
            required
            isMissing={isFieldMissing('serviceFunder')}
          />
        </div>
      </div>

      {/* Employee Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Employee
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="employeeBranch"
            label="Branch"
            value={formData.employeeBranch}
            type="select"
            options={[
              { value: 'Everycare Romford', label: 'Everycare Romford' },
              // Add more branches as needed
            ]}
            onUpdate={(value) => onSelectChange('employeeBranch', value)}
            isSaving={isFieldSaving.employeeBranch}
            required
            isMissing={isFieldMissing('employeeBranch')}
          />
          <EditableField
            id="employeeArea"
            label="Area"
            value={formData.employeeArea}
            type="select"
            options={[
              { value: 'Care', label: 'Care' },
              // Add more areas as needed
            ]}
            onUpdate={(value) => onSelectChange('employeeArea', value)}
            isSaving={isFieldSaving.employeeArea}
            required
            isMissing={isFieldMissing('employeeArea')}
          />
          <EditableField
            id="employee"
            label="Employee"
            value={formData.employee}
            type="select"
            options={[
              { value: 'AKTER, FARHANA', label: 'AKTER, FARHANA' },
              // Add more employees as needed
            ]}
            onUpdate={(value) => onSelectChange('employee', value)}
            isSaving={isFieldSaving.employee}
            required
            isMissing={isFieldMissing('employee')}
          />
        </div>
      </div>

      {/* Service Type & Rates Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Service Type & Rates
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="serviceType"
            label="Service Type"
            value={formData.serviceType}
            type="select"
            options={[
              { value: 'Care', label: 'Care' },
              // Add more service types as needed
            ]}
            onUpdate={(value) => onSelectChange('serviceType', value)}
            isSaving={isFieldSaving.serviceType}
            required
            isMissing={isFieldMissing('serviceType')}
          />
          <EditableField
            id="payRate"
            label="Pay Rate (Hourly)"
            value={formData.payRate}
            type="number"
            onUpdate={(value) => onUpdate('payRate', value)}
            isSaving={isFieldSaving.payRate}
            required
            isMissing={isFieldMissing('payRate')}
          />
          <EditableField
            id="invoiceRate"
            label="Invoice Rate (Hourly)"
            value={formData.invoiceRate}
            type="number"
            onUpdate={(value) => onUpdate('invoiceRate', value)}
            isSaving={isFieldSaving.invoiceRate}
            required
            isMissing={isFieldMissing('invoiceRate')}
          />
          <EditableField
            id="visitType"
            label="Visit Type"
            value={formData.visitType}
            type="select"
            options={[
              { value: 'Other', label: 'Other' },
              // Add more visit types as needed
            ]}
            onUpdate={(value) => onSelectChange('visitType', value)}
            isSaving={isFieldSaving.visitType}
            required
            isMissing={isFieldMissing('visitType')}
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Summary
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="cancellation"
            label="Cancellation"
            value={formData.cancellation}
            type="select"
            options={[
              { value: '', label: '' },
              // Add cancellation options as needed
            ]}
            onUpdate={(value) => onSelectChange('cancellation', value)}
            isSaving={isFieldSaving.cancellation}
          />
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Summary Status</label>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">Successful</span>
              <span className="text-gray-500">All planning rules passed successfully.</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;