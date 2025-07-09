import React from 'react';
import { EditableField } from '../components/EditableField';

interface AdhocInvoiceTabProps {
  formData: {
    adhocInvoice: Array<{
      invoiceStartDate?: string;
      invoiceEndDate?: string;
      invoiceType?: string;
      invoiceValue?: number | string;
      invoiceSummary?: string;
      note?: string;
    }>;
  };
  onUpdate: (field: string, value: any, index?: number) => void;
  onSelectChange: (field: string, value: any, index: number) => void;
  onDateChange: (field: string, value: string, index: number) => void;
  isFieldSaving: Record<string, boolean>;
}

const invoiceTypeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Hourly', value: 'hourly' },
  { label: 'Custom', value: 'custom' }
];

const AdhocInvoiceTab: React.FC<AdhocInvoiceTabProps> = ({
  formData,
  onUpdate,
  onSelectChange,
  onDateChange,
  isFieldSaving
}) => {
  const handleAddMore = () => {
    const newInvoiceEntry = {
      invoiceStartDate: '',
      invoiceEndDate: '',
      invoiceType: undefined,
      invoiceValue: '',
      invoiceSummary: '',
      note: ''
    };

    // Update the parent state with the new array
    onUpdate('adhocInvoice', [...(formData.adhocInvoice || []), newInvoiceEntry]);
  };

  const handleRemove = (index: number) => {
    const updatedInvoices = [...formData.adhocInvoice];
    updatedInvoices.splice(index, 1);
    onUpdate('adhocInvoice', updatedInvoices);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Adhoc Invoice Details
        </h3>

        {/* Show message if no invoices */}
        {(!formData.adhocInvoice || formData.adhocInvoice.length === 0) && (
          <p className="text-gray-500">No invoice data available. Add a new invoice below.</p>
        )}

        {/* Loop through each invoice */}
        {formData.adhocInvoice &&
          formData.adhocInvoice.map((invoice, index) => (
            <div key={index} className="space-y-6 border-b border-gray-200 pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0 relative group">
              {/* Remove button */}
              {formData.adhocInvoice.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove this invoice"
                >
                  ×
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Invoice Start Date */}
                <EditableField
                  id={`invoiceStartDate-${index}`}
                  label="Invoice Start Date"
                  type="date"
                  value={invoice.invoiceStartDate || ''}
                  onUpdate={(value) => onDateChange('invoiceStartDate', value, index)}
                  isSaving={isFieldSaving[`invoiceStartDate-${index}`]}
                  required
                />

                {/* Invoice End Date */}
                <EditableField
                  id={`invoiceEndDate-${index}`}
                  label="Invoice End Date"
                  type="date"
                  value={invoice.invoiceEndDate || ''}
                  onUpdate={(value) => onDateChange('invoiceEndDate', value, index)}
                  isSaving={isFieldSaving[`invoiceEndDate-${index}`]}
                  required
                />

                {/* Invoice Type */}
                <EditableField
                  id={`invoiceType-${index}`}
                  label="Invoice Type"
                  type="select"
                  options={invoiceTypeOptions}
                  value={invoice.invoiceType || 'fixed'}
                  onUpdate={(value) => onSelectChange('invoiceType', value, index)}
                  isSaving={isFieldSaving[`invoiceType-${index}`]}
                  required
                />

                {/* Invoice Value */}
                <EditableField
                  id={`invoiceValue-${index}`}
                  label="Invoice Value"
                  type="number"
                  value={invoice.invoiceValue || ''}
                  onUpdate={(value) => onUpdate('invoiceValue', value, index)}
                  isSaving={isFieldSaving[`invoiceValue-${index}`]}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Invoice Summary */}
                <EditableField
                  id={`invoiceSummary-${index}`}
                  label="Invoice Summary"
                  type="textarea"
                  value={invoice.invoiceSummary || ''}
                  onUpdate={(value) => onUpdate('invoiceSummary', value, index)}
                  isSaving={isFieldSaving[`invoiceSummary-${index}`]}
                />

                {/* Note */}
                <EditableField
                  id={`note-${index}`}
                  label="Note"
                  type="textarea"
                  value={invoice.note || ''}
                  onUpdate={(value) => onUpdate('note', value, index)}
                  isSaving={isFieldSaving[`note-${index}`]}
                />
              </div>
            </div>
          ))}

        {/* Add More Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleAddMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};



export default AdhocInvoiceTab;