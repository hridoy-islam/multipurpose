import React from 'react';
import moment from 'moment';
import { countries } from '@/types';
import { EditableField } from '../components/EditableField';

interface PersonalInfoTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onDateChange: (field: string, value: string) => void;
  onSelectChange: (field: string, value: string) => void;
  isFieldSaving: Record<string, boolean>;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  formData,
  onUpdate,
  onDateChange,
  onSelectChange,
  isFieldSaving
}) => {
  const typeOptions = [
    { value: 'private-client', label: 'Private Client' },
    { value: 'other-organization', label: 'Other Organization' },
    { value: 'social-services', label: 'Social Services' }
  ];

  const titleOptions = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const servicePriorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const branchOptions = [
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' }
  ];

  const areaOptions = [
    { value: 'zone-1', label: 'Zone 1' },
    { value: 'zone-2', label: 'Zone 2' },
    { value: 'zone-3', label: 'Zone 3' }
  ];

  const countryOptions = countries.map((country) => ({
    value: country,
    label: country
  }));

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EditableField
            id="type"
            label="Service User Type"
            value={formData.type}
            type="select"
            options={typeOptions}
            onUpdate={(value) => onSelectChange('type', value)}
            isSaving={isFieldSaving.type}
            required
          />

          <EditableField
            id="title"
            label="Title"
            value={formData.title}
            type="select"
            options={titleOptions}
            onUpdate={(value) => onSelectChange('title', value)}
            isSaving={isFieldSaving.title}
            required
          />

          <EditableField
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onUpdate={(value) => onUpdate('firstName', value)}
            isSaving={isFieldSaving.firstName}
            required
          />

          <EditableField
            id="middleInitial"
            label="Middle Initial"
            value={formData.middleInitial}
            onUpdate={(value) => onUpdate('middleInitial', value)}
            isSaving={isFieldSaving.middleInitial}
            placeholder="M"
            maxLength={1}
          />

          <EditableField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onUpdate={(value) => onUpdate('lastName', value)}
            isSaving={isFieldSaving.lastName}
            required
          />

          <EditableField
            id="startDate"
            label="Start Date"
            value={formData.startDate || ''}
            type="date"
            onUpdate={(value) => onDateChange('startDate', value)}
            isSaving={isFieldSaving.startDate}
            required
          />

          <EditableField
            id="lastDutyDate"
            label="Last Duty Date"
            value={formData.lastDutyDate || ''}
            type="date"
            onUpdate={(value) => onDateChange('lastDutyDate', value)}
            isSaving={isFieldSaving.lastDutyDate}
          />

          <EditableField
            id="status"
            label="Status"
            value={formData.status}
            type="select"
            options={statusOptions}
            onUpdate={(value) => onSelectChange('status', value)}
            isSaving={isFieldSaving.status}
            required
          />

          <EditableField
            id="servicePriority"
            label="Service Priority"
            value={formData.servicePriority}
            type="select"
            options={servicePriorityOptions}
            onUpdate={(value) => onSelectChange('servicePriority', value)}
            isSaving={isFieldSaving.servicePriority}
            required
          />

          <EditableField
            id="branch"
            label="Branch"
            value={formData.branch}
            type="select"
            options={branchOptions}
            onUpdate={(value) => onSelectChange('branch', value)}
            isSaving={isFieldSaving.branch}
            required
          />

          <EditableField
            id="area"
            label="Area"
            value={formData.area}
            type="select"
            options={areaOptions}
            onUpdate={(value) => onSelectChange('area', value)}
            isSaving={isFieldSaving.area}
            required
          />
          <EditableField
            id="description"
            label="Description"
            value={formData.description}
            type="textarea"
            onUpdate={(value) => onUpdate('description', value)}
            isSaving={isFieldSaving.description}
            required
            rows={3}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
          Address Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableField
            id="address"
            label="Full Address"
            value={formData.address}
            type="textarea"
            onUpdate={(value) => onUpdate('address', value)}
            isSaving={isFieldSaving.address}
            required
            rows={3}
          />

          <EditableField
            id="city"
            label="City/Town"
            value={formData.city}
            onUpdate={(value) => onUpdate('city', value)}
            isSaving={isFieldSaving.city}
            required
          />

          <EditableField
            id="postCode"
            label="Postal Code"
            value={formData.postCode?.toUpperCase()}
            onUpdate={(value) => onUpdate('postCode', value.toUpperCase())}
            isSaving={isFieldSaving.postCode}
            required
          />

          <EditableField
            id="country"
            label="Country"
            value={formData.country}
            type="select"
            options={countryOptions}
            onUpdate={(value) => onSelectChange('country', value)}
            isSaving={isFieldSaving.country}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
