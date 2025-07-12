import React, { useState } from 'react';
import { Eye, Download, Calendar, DollarSign, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import moment from 'moment';
import { Invoice } from '../types/InvoiceTypes';
import { Button } from '@/components/ui/button';

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewDetails: (invoice: Invoice) => void;
  onDownloadInvoice: (invoice: Invoice) => void;
  onPayInvoice: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onViewDetails,
  onDownloadInvoice,
  onPayInvoice
}) => {
  const [sortField, setSortField] = useState<string>('invoiceDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...invoices].sort((a, b) => {
    let aValue: any = a[sortField as keyof Invoice];
    let bValue: any = b[sortField as keyof Invoice];

    if (sortField === 'invoiceDate' || sortField === 'dueDate') {
      aValue = moment(aValue);
      bValue = moment(bValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleRowExpansion = (invoiceId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(invoiceId)) {
      newExpanded.delete(invoiceId);
    } else {
      newExpanded.add(invoiceId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const getTotalHours = (invoice: Invoice) => {
    return invoice.items.reduce((total, item) => total + item.hours, 0);
  };

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Invoices Found</h3>
        <p className="text-gray-500">No invoices match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('invoiceNumber')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Invoice #</span>
                  <SortIcon field="invoiceNumber" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('invoiceDate')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Date</span>
                  <SortIcon field="invoiceDate" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('total')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Total Hours</span>
                  <SortIcon field="total" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('total')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Amount</span>
                  <SortIcon field="total" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Status</span>
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedInvoices.map((invoice) => (
              <React.Fragment key={invoice.id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleRowExpansion(invoice.id)}
                        className="mr-2 p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedRows.has(invoice.id) ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </button>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div className="text-sm text-gray-900">
                        {moment(invoice.invoiceDate).format('MMM DD, YYYY')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {moment(invoice.periodStart).format('MMM DD')} - {moment(invoice.periodEnd).format('MMM DD, YYYY')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        {getTotalHours(invoice)}h
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        ${invoice.total.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex flex-row justify-end">
                    <div className="flex flex-wrap gap-2">
  <Button
    onClick={() => onViewDetails(invoice)}
    className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
  >
    <Eye className="h-4 w-4" />
    <span>View</span>
  </Button>
  <Button
    onClick={() => onDownloadInvoice(invoice)}
    className="inline-flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
  >
    <Download className="h-4 w-4" />
    <span>PDF</span>
  </Button>
  {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
    <Button
      onClick={() => onPayInvoice(invoice)}
      className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
    >
      <DollarSign className="h-4 w-4" />
      <span>Pay</span>
    </Button>
  )}
</div>

                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRows.has(invoice.id) && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Service Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {invoice.items.map((item) => (
                            <div key={item.id} className="bg-white p-3 rounded-md border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">{item.carerName}</span>
                              </div>
                              <div className="text-xs text-gray-600 space-y-1">
                                <div>{item.serviceType}</div>
                                <div>{moment(item.date).format('MMM DD, YYYY')}</div>
                                <div>{item.startTime} - {item.endTime}</div>
                                <div className="flex justify-between">
                                  <span>{item.hours}h × ${item.hourlyRate}/h</span>
                                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;