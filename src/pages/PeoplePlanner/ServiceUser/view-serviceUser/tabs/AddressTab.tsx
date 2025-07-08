import React from 'react';
import { EditableField } from '../components/EditableField';
import { countries } from '@/types';

interface AddressTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onSelectChange: (field: string, value: string) => void;
  isFieldSaving: Record<string, boolean>;
}

const AddressTab: React.FC<AddressTabProps> = ({
  formData,
  onUpdate,
  onSelectChange,
  isFieldSaving,
}) => {


  return (
    <div className="space-y-8">
   

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            id="phone"
            label="Phone Number"
            value={formData.phone}
            type="text"
            onUpdate={(value) => onUpdate('phone', value)}
            isSaving={isFieldSaving.phone}
            required
            placeholder="Enter phone number"
          />

          <EditableField
            id="fax"
            label="Fax Number"
            value={formData.fax}
            type="text"
            onUpdate={(value) => onUpdate('fax', value)}
            isSaving={isFieldSaving.fax}
            placeholder="Enter fax number"
          />
          <EditableField
            id="email"
            label="Email"
            value={formData.email}
            type="email"
            onUpdate={(value) => onUpdate('email', value)}
            isSaving={isFieldSaving.email}
            placeholder="Enter the email address"
          />

          <EditableField
            id="mobilePhone"
            label="Mobile Phone"
            value={formData.homePhone}
            type="text"
            onUpdate={(value) => onUpdate('mobilePhone', value)}
            isSaving={isFieldSaving.mobilePhone}
            placeholder="Enter Mobile phone number"
          />

          <EditableField
            id="otherPhone"
            label="Other Phone"
            value={formData.otherPhone}
            type="text"
            onUpdate={(value) => onUpdate('otherPhone', value)}
            isSaving={isFieldSaving.otherPhone}
            placeholder="Enter other phone number"
          />
          <EditableField
            id="website"
            label="Website"
            value={formData.website}
            type="text"
            onUpdate={(value) => onUpdate('website', value)}
            isSaving={isFieldSaving.website}
            placeholder="Enter website URL"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressTab;