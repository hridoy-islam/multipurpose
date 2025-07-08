import React, { useState } from 'react';
import { MoveLeft, AlertCircle } from 'lucide-react';
import { Tabs } from './components/Tabs';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import AddressTab from './tabs/AddressTab';
import MiscellaneousTab from './tabs/MiscellaneousTab';
import EqualityTab from './tabs/EqualityTab';
import { ValidationNotification } from './components/ValidationNotification';
import { useEditApplicant } from './hooks/useEditApplicant';
import { Button } from '@/components/ui/button';
import EmergencyContactTab from './tabs/EmergencyContacTab';

const ServiceFunderDetailPage = () => {
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
          <p className="mt-4 font-medium text-gray-600">
            Loading applicant data...
          </p>
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
      label: 'Contact',
      component: (
        <AddressTab
          formData={formData}
          onUpdate={handleFieldUpdate}
          onSelectChange={handleSelectChange}
          isFieldSaving={isFieldSaving}
        />
      )
    },
    {
      id: 'equality',
      label: 'Equality',
      component: (
        <EqualityTab
          formData={formData}
          onUpdate={handleFieldUpdate}
          onSelectChange={handleSelectChange}
          isFieldSaving={isFieldSaving}
        />
      )
    },
    {
      id: 'other',
      label: 'Other',
      component: (
        <MiscellaneousTab
          formData={formData}
          onUpdate={handleFieldUpdate}
          onDateChange={handleDateChange}
          onSelectChange={handleSelectChange}
          isFieldSaving={isFieldSaving}
        />
      )
    },
    {
      id: 'emergency',
      label: 'Emergency Contact',
      component: (
        <EmergencyContactTab
          formData={formData}
          onUpdate={handleFieldUpdate}
          onDateChange={handleDateChange}
          onSelectChange={handleSelectChange}
          isFieldSaving={isFieldSaving}
        />
      )
    }
  ];

  const handleTabNavigation = (tabId: string) => {
    setActiveTab(tabId);
  };

  const incompleteTabsCount = Object.values(tabValidation).filter(
    (validation) => !validation.isValid
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8 sm:px-2 lg:px-2">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Service User</h1>
              {incompleteTabsCount > 0 && (
                <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    {incompleteTabsCount} incomplete{' '}
                    {incompleteTabsCount === 1 ? 'tab' : 'tabs'}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-2 text-gray-600">
              {formData.firstName && formData.lastName
                ? `${formData.title || ''} ${formData.firstName} ${formData.lastName}`.trim()
                : 'Manage applicant information'}
            </p>
          </div>
          <Button
            variant="outline"
            className="border-none bg-supperagent text-white  hover:bg-supperagent/90"
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
