import React, { useState } from 'react';
import { MoveLeft, AlertCircle } from 'lucide-react';
import { Tabs } from './components/Tabs';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import AddressTab from './tabs/ContactTab';
import MiscellaneousTab from './tabs/MiscellaneousTab';
import EqualityTab from './tabs/EqualityTab';
import { ValidationNotification } from './components/ValidationNotification';
import { useEditApplicant } from './hooks/useEditApplicant';
import { Button } from '@/components/ui/button';
import EmergencyContactTab from './tabs/EmergencyContacTab';
import ContactTab from './tabs/ContactTab';
import TravelTab from './tabs/TravelTab';
import InvoiceTab from './tabs/InvoiceTab';
import InvoiceContactTab from './tabs/InvoiceContactTab';
import PurchaseOrderTab from './tabs/PurchaseOrderTab';
import TravelRateDetailTab from './tabs/TravelDetailsTab';
import AdhocInvoiceTab from './tabs/AdhocInvoiceTab';

const ServiceFunderDetailPage = () => {
  const [showNotification, setShowNotification] = useState(true);
  
  const { 
    loading, 
    activeTab, 
    setActiveTab,
    formData,
    handleFieldUpdate,
    handleDateChange,
    handleSelectChange,
    handleCheckboxChange,
    isFieldSaving,
    getTabValidation
  } = useEditApplicant();

  const tabValidation = getTabValidation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading applicant data...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'general', 
      label: 'General', 
      component: (
        <PersonalInfoTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'contact', 
      label: 'Communication', 
      component: (
        <ContactTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'travel', 
      label: 'Travel Information', 
      component: (
        <TravelTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'invoice', 
      label: 'Invoice', 
      component: (
        <InvoiceTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'invoiceContact', 
      label: 'Invoice Contact', 
      component: (
        <InvoiceContactTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'po', 
      label: 'PO', 
      component: (
        <PurchaseOrderTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'travelrate', 
      label: 'Travel Details', 
      component: (
        <TravelRateDetailTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
    { 
      id: 'adhocInvoice', 
      label: 'Adhoc Invoice', 
      component: (
        <AdhocInvoiceTab 
          formData={formData} 
          onUpdate={handleFieldUpdate} 
          onDateChange={handleDateChange} 
          onSelectChange={handleSelectChange} 
          isFieldSaving={isFieldSaving} 
        />
      )
    },
  ];

  const handleTabNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setShowNotification(false);
  };

  const incompleteTabsCount = Object.values(tabValidation).filter(validation => !validation.isValid).length;

  return (
 <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8 sm:px-2 lg:px-2">
        <div className="-mt-8 mb-4 flex items-center justify-between">
          <div>
           
            <p className="mt-2 font-semibold text-3xl text-gray-600">
              {formData.firstName && formData.lastName 
                ? `${formData.title || ''} ${formData.firstName} ${formData.lastName}`.trim()
                : 'Manage applicant information'
              }
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
            onClick={() => window.history.back()}
          >
            <MoveLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Tabs
                      tabs={tabs}
                      activeTab={activeTab}
                      onChange={setActiveTab}
                      validation={tabValidation}
                    />
                  </div>
        
                  {incompleteTabsCount > 0 && (
                    <div className="">
                      <ValidationNotification
                        validation={tabValidation}
                        onTabClick={handleTabNavigation}
                      />
                    </div>
                  )}
                </div>
      </div>
    </div>
  );
};

export default ServiceFunderDetailPage;