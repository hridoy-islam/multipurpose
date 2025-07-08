import { useState, useEffect } from 'react';

interface FormData {
  // Personal Information
  type: string  | null;
  title: string  | null;
  image?: any;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  preferredName?: string;
  dateOfBirth: string;
  gender: string | null;
  maritalStatus?: string | null;
  ethnicOrigin?: string | null;
  religion?: string;

  // Address & Location
  address: string;
  city: string;
  postCode: string;
  country: string;

  // Contact Information
  phone?: string;
  fax?: string;
  mobile?: string;
  other?: string;
  email: string;
  website?: string;

  // Employment / Service Details
  startDate: string;
  lastDutyDate?: string;
  status: string | null;
  servicePriority: string | null;
  serviceLocationExId: string;
  timesheetSignature: boolean;
  timesheetSignatureNote?: string;

  // Additional Fields (used elsewhere in your app)
  phoneNumber?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  disability?: string;
  ethnicity?: string;
  nationality?: string;
  preferredLanguage?: string;

  // Allow flexible key-value access
  [key: string]: any;
}


interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
}

interface TabValidation {
  [key: string]: ValidationResult;
}

export const useEditApplicant = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isFieldSaving, setIsFieldSaving] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    type: 'individual',
    title: 'Mr',
    firstName: 'John',
    middleInitial: '',
    lastName: 'Doe',
    preferredName: '',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    maritalStatus: 'Single',
    ethnicOrigin: '',
    religion: 'Islam',
    address: '',
    city: '',
    postCode: '',
    country: 'United Kingdom',
    phone: '',
    fax: '',
    mobile: '',
    other: '',
    email: '',
    website: '',
    startDate: '1990-01-01',
    lastDutyDate: '1990-01-01',
    status: 'active',
    servicePriority: 'medium',
    serviceLocationExId: '',
    timesheetSignature: false,
    timesheetSignatureNote: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    disability: '',
    ethnicity: '',
    nationality: '',
    preferredLanguage: '',
    emergencyContacts: [
    {
      emergencyContactName: '',
      relationship: '',
      address: '',
      cityOrTown: '',
      country: '',
      postCode: '',
      note: '',
      phone: '',
      mobile: '',
      email: '',
      emailRota: false,
      sendInvoice: false
    }
  ]
  });

  // Define required fields for each tab
  const requiredFieldsByTab = {
    general: [
      { field: 'type', label: 'Service User Type' },
      { field: 'title', label: 'Title' },
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'dateOfBirth', label: 'Date of Birth' },
      { field: 'gender', label: 'Gender' },
      { field: 'maritalStatus', label: 'Marital Status' },
      { field: 'startDate', label: 'Start Date' },
      { field: 'lastDutyDate', label: 'Last Duty Date' },
      { field: 'status', label: 'Status' },
      { field: 'servicePriority', label: 'Service Priority' },
      { field: 'address', label: 'Full Address' },
      { field: 'cityOrTown', label: 'City/Town' },
      { field: 'postCode', label: 'Postal Code' },
      { field: 'country', label: 'Country' },
    ],
    contact: [
      { field: 'phoneNumber', label: 'Phone Number' },
      { field: 'email', label: 'Email Address' }
    ],
    equality: [
      { field: 'ethnicity', label: 'Ethnicity' },
      { field: 'nationality', label: 'Nationality' },
      { field: 'preferredLanguage', label: 'Preferred Language' }
    ],
    other: [
      { field: 'serviceLocationExId', label: 'Service Location Ex Id' },
      
    ]
  };

  const validateTab = (tabId: string): ValidationResult => {
    const requiredFields = requiredFieldsByTab[tabId as keyof typeof requiredFieldsByTab] || [];
    const missingFields: string[] = [];

    requiredFields.forEach(({ field, label }) => {
      const value = formData[field];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        missingFields.push(label);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  };

  const getTabValidation = (): TabValidation => {
    const validation: TabValidation = {};
    Object.keys(requiredFieldsByTab).forEach(tabId => {
      validation[tabId] = validateTab(tabId);
    });
    return validation;
  };

  const handleFieldUpdate = async (field: string, value: any) => {
    setIsFieldSaving(prev => ({ ...prev, [field]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFieldSaving(prev => ({ ...prev, [field]: false }));
  };

  const handleDateChange = async (field: string, value: string) => {
    setIsFieldSaving(prev => ({ ...prev, [field]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFieldSaving(prev => ({ ...prev, [field]: false }));
  };

  const handleSelectChange = async (field: string, value: string) => {
    setIsFieldSaving(prev => ({ ...prev, [field]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFieldSaving(prev => ({ ...prev, [field]: false }));
  };

  const handleCheckboxChange = async (field: string, value: boolean) => {
    setIsFieldSaving(prev => ({ ...prev, [field]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFieldSaving(prev => ({ ...prev, [field]: false }));
  };

  return {
    loading,
    activeTab,
    setActiveTab,
    formData,
    handleFieldUpdate,
    handleDateChange,
    handleSelectChange,
    handleCheckboxChange,
    isFieldSaving,
    getTabValidation,
    validateTab,
    requiredFieldsByTab
  };
};