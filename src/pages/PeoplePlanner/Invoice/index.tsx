import React, { useState, useEffect, useMemo } from 'react';
import { FileText, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import moment from 'moment';
import { Invoice, InvoiceFilters } from '@/types/InvoiceTypes';
import InvoiceTable from './components/InvoiceTable';
import InvoiceFiltersComponent from './components/InvoiceFilters';
import InvoiceDetailsModal from './components/InvoiceDetailsModal';
import InvoicePDF from './components/InvoicePDF';
import { pdf } from '@react-pdf/renderer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filters, setFilters] = useState<InvoiceFilters>({
    dateRange: {
      startDate: null,
      endDate: null
    },
    status: 'all',
    minAmount: '',
    maxAmount: ''
  });
const [invoiceToPay, setInvoiceToPay] = useState<Invoice | null>(null);
const handlePayInvoice = (invoice: Invoice) => {
  setInvoiceToPay(invoice); // Triggers modal open
};

const confirmPayment = () => {
  if (!invoiceToPay) return;

  setInvoices((prev) =>
    prev.map((inv) =>
      inv.id === invoiceToPay.id
        ? {
            ...inv,
            status: 'paid',
            paymentDate: moment().format('YYYY-MM-DD'),
            notes: 'Payment processed successfully.',
          }
        : inv
    )
  );
  setInvoiceToPay(null); // Close modal
};


  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-2025-001',
        serviceUserId: 'USER001',
        serviceUserName: 'John Smith',
        serviceUserAddress: '123 Main Street, City, State 12345',
        serviceUserEmail: 'john.smith@email.com',
        serviceUserPhone: '+44 7700 900123',
        invoiceDate: '2025-01-15',
        dueDate: '2025-02-14',
        periodStart: '2025-01-01',
        periodEnd: '2025-01-15',
        items: [
          {
            id: '1',
            serviceType: 'Personal Care',
            carerName: 'Sarah Johnson',
            date: '2025-01-02',
            startTime: '09:00',
            endTime: '11:00',
            hours: 2,
            hourlyRate: 25.00,
            amount: 50.00,
            description: 'Morning personal care routine'
          },
          {
            id: '2',
            serviceType: 'Companionship',
            carerName: 'Emma Williams',
            date: '2025-01-05',
            startTime: '14:00',
            endTime: '17:00',
            hours: 3,
            hourlyRate: 22.00,
            amount: 66.00,
            description: 'Social visit and activities'
          },
          {
            id: '3',
            serviceType: 'Medication Support',
            carerName: 'Michael Smith',
            date: '2025-01-08',
            startTime: '10:00',
            endTime: '11:00',
            hours: 1,
            hourlyRate: 28.00,
            amount: 28.00,
            description: 'Medication administration'
          },
          {
            id: '4',
            serviceType: 'Domestic Support',
            carerName: 'David Brown',
            date: '2025-01-12',
            startTime: '08:00',
            endTime: '12:00',
            hours: 4,
            hourlyRate: 20.00,
            amount: 80.00,
            description: 'Household cleaning and shopping'
          }
        ],
        subtotal: 224.00,
        tax: 44.80,
        taxRate: 0.20,
        total: 268.80,
        status: 'paid',
        paymentDate: '2025-01-20',
        notes: 'Thank you for your prompt payment.'
      },
      {
        id: '2',
        invoiceNumber: 'INV-2025-002',
        serviceUserId: 'USER001',
        serviceUserName: 'John Smith',
        serviceUserAddress: '123 Main Street, City, State 12345',
        serviceUserEmail: 'john.smith@email.com',
        serviceUserPhone: '+44 7700 900123',
        invoiceDate: '2025-01-20',
        dueDate: '2025-02-19',
        periodStart: '2025-01-16',
        periodEnd: '2025-01-31',
        items: [
          {
            id: '5',
            serviceType: 'Personal Care',
            carerName: 'Sarah Johnson',
            date: '2025-01-18',
            startTime: '09:00',
            endTime: '11:00',
            hours: 2,
            hourlyRate: 25.00,
            amount: 50.00,
            description: 'Morning personal care routine'
          },
          {
            id: '6',
            serviceType: 'Transportation',
            carerName: 'Lisa Davis',
            date: '2025-01-22',
            startTime: '13:30',
            endTime: '16:30',
            hours: 3,
            hourlyRate: 24.00,
            amount: 72.00,
            description: 'Medical appointment transport'
          },
          {
            id: '7',
            serviceType: 'Companionship',
            carerName: 'Emma Williams',
            date: '2025-01-25',
            startTime: '10:00',
            endTime: '13:00',
            hours: 3,
            hourlyRate: 22.00,
            amount: 66.00,
            description: 'Social visit and light activities'
          }
        ],
        subtotal: 188.00,
        tax: 37.60,
        taxRate: 0.20,
        total: 225.60,
        status: 'pending',
        notes: 'Payment due within 30 days of invoice date.'
      },
      {
        id: '3',
        invoiceNumber: 'INV-2024-045',
        serviceUserId: 'USER001',
        serviceUserName: 'John Smith',
        serviceUserAddress: '123 Main Street, City, State 12345',
        serviceUserEmail: 'john.smith@email.com',
        serviceUserPhone: '+44 7700 900123',
        invoiceDate: '2024-12-15',
        dueDate: '2025-01-14',
        periodStart: '2024-12-01',
        periodEnd: '2024-12-15',
        items: [
          {
            id: '8',
            serviceType: 'Personal Care',
            carerName: 'Sarah Johnson',
            date: '2024-12-05',
            startTime: '09:00',
            endTime: '12:00',
            hours: 3,
            hourlyRate: 25.00,
            amount: 75.00,
            description: 'Extended morning care'
          },
          {
            id: '9',
            serviceType: 'Domestic Support',
            carerName: 'David Brown',
            date: '2024-12-10',
            startTime: '08:00',
            endTime: '11:00',
            hours: 3,
            hourlyRate: 20.00,
            amount: 60.00,
            description: 'Deep cleaning service'
          }
        ],
        subtotal: 135.00,
        tax: 27.00,
        taxRate: 0.20,
        total: 162.00,
        status: 'overdue',
        notes: 'Payment is now overdue. Please contact billing department.'
      }
    ];
    setInvoices(mockInvoices);
  }, []);

  // Filter invoices based on current filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      // Date range filter
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        const invoiceDate = moment(invoice.invoiceDate);
        if (filters.dateRange.startDate && invoiceDate.isBefore(moment(filters.dateRange.startDate))) {
          return false;
        }
        if (filters.dateRange.endDate && invoiceDate.isAfter(moment(filters.dateRange.endDate))) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'all' && invoice.status !== filters.status) {
        return false;
      }

      // Amount range filter
      if (filters.minAmount && invoice.total < parseFloat(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && invoice.total > parseFloat(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [invoices, filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const totalHours = filteredInvoices.reduce((sum, invoice) => 
      sum + invoice.items.reduce((itemSum, item) => itemSum + item.hours, 0), 0
    );
    const paidAmount = filteredInvoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.total, 0);
    const pendingAmount = filteredInvoices
      .filter(invoice => invoice.status === 'pending')
      .reduce((sum, invoice) => sum + invoice.total, 0);

    return {
      totalAmount,
      totalHours,
      paidAmount,
      pendingAmount,
      invoiceCount: filteredInvoices.length
    };
  }, [filteredInvoices]);

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: {
        startDate: null,
        endDate: null
      },
      status: 'all',
      minAmount: '',
      maxAmount: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div >
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
              <p className="mt-2 text-gray-600">
                View and manage your service invoices
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className="text-sm text-gray-500">Today</div>
              <div className="text-lg font-semibold text-gray-900">
                {moment().format('dddd, MMMM Do YYYY')}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Total Invoices</div>
                <div className="text-2xl font-bold text-gray-900">{summaryStats.invoiceCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Total Amount</div>
                <div className="text-2xl font-bold text-gray-900">${summaryStats.totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Total Hours</div>
                <div className="text-2xl font-bold text-gray-900">{summaryStats.totalHours}h</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Pending Amount</div>
                <div className="text-2xl font-bold text-gray-900">${summaryStats.pendingAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <InvoiceFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Invoice Table */}
        <InvoiceTable
          invoices={filteredInvoices}
          onViewDetails={handleViewDetails}
          onDownloadInvoice={handleDownloadInvoice}
           onPayInvoice={handlePayInvoice}
        />

        {/* Invoice Details Modal */}
        {selectedInvoice && (
          <InvoiceDetailsModal
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
            onDownload={() => handleDownloadInvoice(selectedInvoice)}
          />
        )}

        {invoiceToPay && (
  <Dialog open={!!invoiceToPay} onOpenChange={(open) => !open && setInvoiceToPay(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogDescription>
          Are you sure you want to mark invoice <strong>{invoiceToPay.invoiceNumber}</strong> as paid?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button
          onClick={() => setInvoiceToPay(null)}
          className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={confirmPayment}
          className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Confirm
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

      </div>
    </div>
  );
};

export default InvoicePage;