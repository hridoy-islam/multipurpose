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
  const titleOptions = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
    { value: 'Prof', label: 'Prof' }
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  const maritalStatusOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Separated', label: 'Separated' },
    { value: 'Civil Partnership', label: 'Civil Partnership' }
  ];

  const countryOptions = countries.map((country) => ({
    value: country,
    label: country
  }));
  
   const statusOptions = [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'terminated', label: 'Terminated' }
    ];
  
    const servicePriorityOptions = [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ];
  
  const typeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'organization', label: 'Organization' },
    { value: 'individual-with-medication', label: 'Individual With Medication' }
  ];
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
            placeholder="Enter first name"
          />

          <EditableField
            id="initial"
            label="Middle Initial"
            value={formData.initial}
            onUpdate={(value) => onUpdate('initial', value)}
            isSaving={isFieldSaving.initial}
            placeholder="Enter middle initial"
            maxLength={1}
          />

          <EditableField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onUpdate={(value) => onUpdate('lastName', value)}
            isSaving={isFieldSaving.lastName}
            required
            placeholder="Enter last name"
          />

          <EditableField
            id="dateOfBirth"
            label="Date of Birth"
            value={
              formData.dateOfBirth
                ? moment(formData.dateOfBirth).format('YYYY-MM-DD')
                : ''
            }
            type="date"
            onUpdate={(value) => onDateChange('dateOfBirth', value)}
            isSaving={isFieldSaving.dateOfBirth}
            required
          />

          <EditableField
            id="gender"
            label="Gender"
            value={formData.gender}
            type="select"
            options={genderOptions}
            onUpdate={(value) => onSelectChange('gender', value)}
            isSaving={isFieldSaving.gender}
            required
          />

          <EditableField
            id="maritalStatus"
            label="Marital Status"
            value={formData.maritalStatus}
            type="select"
            options={maritalStatusOptions}
            onUpdate={(value) => onSelectChange('maritalStatus', value)}
            isSaving={isFieldSaving.maritalStatus}
            required
          />

          <EditableField
            id="ethnicOrigin"
            label="Ethnic Origin"
            value={formData.ethnicOrigin}
            onUpdate={(value) => onUpdate('ethnicOrigin', value)}
            isSaving={isFieldSaving.ethnicOrigin}
            placeholder="Enter ethnic origin"
          />
          <EditableField
            id="religion"
            label="Religion"
            value={formData.religion}
            onUpdate={(value) => onUpdate('religion', value)}
            isSaving={isFieldSaving.religion}
            placeholder="Enter religion"
          />



             <EditableField
            id="startDate"
            label="Start Date"
            value={formData.startDate ? formData.startDate : ''}
            type="date"
            onUpdate={(value) => onDateChange('startDate', value)}
            isSaving={isFieldSaving.startDate}
            required
          />
          <EditableField
            id="lastDutyDate"
            label="Last Duty Date"
            value={formData.lastDutyDate ? formData.lastDutyDate : ''}
            type="date"
            onUpdate={(value) => onDateChange('lastDutyDate', value)}
            isSaving={isFieldSaving.lastDutyDate}
            required
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
        </div>
      </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-900">
            Address Information
          </h3>

          <div className="space-y-6">
            <EditableField
              id="address"
              label="Full Address"
              value={formData.address}
              type="textarea"
              onUpdate={(value) => onUpdate('address', value)}
              isSaving={isFieldSaving.address}
              required
              placeholder="Enter full street address"
              rows={3}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableField
                id="cityOrTown"
                label="City/Town"
                value={formData.cityOrTown}
                onUpdate={(value) => onUpdate('cityOrTown', value)}
                isSaving={isFieldSaving.cityOrTown}
                required
                placeholder="Enter city or town"
              />

              <EditableField
                id="postCode"
                label="Postal Code"
                value={formData.postCode}
                onUpdate={(value) => onUpdate('postCode', value)}
                isSaving={isFieldSaving.postCode}
                required
                placeholder="Enter postal code"
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
    </div>
  );
};

export default PersonalInfoTab;
