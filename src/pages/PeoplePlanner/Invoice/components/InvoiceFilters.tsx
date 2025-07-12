import React from 'react';
import DatePicker from 'react-datepicker';
import { Filter, Calendar, DollarSign, X } from 'lucide-react';
import { InvoiceFilters } from '../types/InvoiceTypes';
import 'react-datepicker/dist/react-datepicker.css';

interface InvoiceFiltersProps {
  filters: InvoiceFilters;
  onFiltersChange: (filters: InvoiceFilters) => void;
  onClearFilters: () => void;
}

const InvoiceFiltersComponent: React.FC<InvoiceFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    onFiltersChange({
      ...filters,
      dateRange: { startDate, endDate }
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status
    });
  };

  const handleAmountChange = (field: 'minAmount' | 'maxAmount', value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filter Invoices</h2>
        </div>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range Filter */}
        <div className='flex flex-col w-full'>
          <label className=" text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Date Range
          </label>
          <DatePicker
            selectsRange={true}
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            onChange={handleDateRangeChange}
            placeholderText="Select date range"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dateFormat="MMM dd, yyyy"
            isClearable={true}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

       
      </div>
    </div>
  );
};

export default InvoiceFiltersComponent;