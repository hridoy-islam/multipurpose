import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface ValidationNotificationProps {
  validation: { [key: string]: { isValid: boolean; missingFields: string[] } };
  onTabClick: (tabId: string) => void;
}

const tabLabels: { [key: string]: string } = {
  general: 'General',
  contact: 'Contact',
  equality: 'Equality',
  other: 'Other',
  emergency: 'Emergency Contact',
};

export const ValidationNotification: React.FC<ValidationNotificationProps> = ({
  validation,
  onTabClick,
}) => {
  const incompleteTabs = Object.entries(validation).filter(
    ([_, tabValidation]) => !tabValidation.isValid
  );

  if (incompleteTabs.length === 0) return null;

  const totalMissingFields = incompleteTabs.reduce(
    (total, [_, tabValidation]) => total + tabValidation.missingFields.length,
    0
  );

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg self-center">
      <div className="p-2">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <h3 className="text-sm font-semibold text-black">
            Incomplete Required Fields
          </h3>
        </div>

        <p className="text-sm text-red-700 mb-4">
          {totalMissingFields} required {totalMissingFields === 1 ? 'field' : 'fields'} missing across {incompleteTabs.length} {incompleteTabs.length === 1 ? 'tab' : 'tabs'}
        </p>

        <div className="space-y-2">
          {incompleteTabs.map(([tabId, tabValidation]) => (
            <div
              key={tabId}
              className="group cursor-pointer p-3 rounded-md border border-gray-300 transition-all duration-200 hover:border-red-400"
              onClick={() => onTabClick(tabId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-black">
                    {tabLabels[tabId] || tabId}
                  </span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {tabValidation.missingFields.length}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-1">
                <p className="text-xs text-black">
                  Missing: {tabValidation.missingFields.slice(0, 2).join(', ')}
                  {tabValidation.missingFields.length > 2 &&
                    ` +${tabValidation.missingFields.length - 2} more`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-xs text-black">
            Click on any tab above to complete the missing fields
          </p>
        </div>
      </div>
    </div>
  );
};
