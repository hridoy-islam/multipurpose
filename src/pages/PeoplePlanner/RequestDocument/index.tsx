import React, { useState, useEffect } from 'react';
import { FileText, Plus, Filter, Search } from 'lucide-react';
import moment from 'moment';
import { DocumentRequest } from '@/types/DocumentTypes';
import DocumentRequestForm from './components//DocumentRequestForm';
import DocumentRequestList from './components//DocumentRequestList';
import DocumentViewer from './components/DocumentViewer';
import { pdf } from '@react-pdf/renderer';
import { PayslipPDF, ExperienceLetterPDF, AppointmentLetterPDF, JobContractPDF } from './components/PDFDocuments';

const DocumentRequestPage: React.FC = () => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<DocumentRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockRequests: DocumentRequest[] = [
      {
        id: '1',
        staffId: 'STAFF001',
        staffName: 'John Smith',
        staffEmail: 'john.smith@company.com',
        department: 'Care Services',
        documentType: 'payslip',
        requestDate: '2025-01-10',
        status: 'approved',
        adminNotes: 'Approved for current month payslip',
        approvedBy: 'Sarah Johnson',
        approvedDate: '2025-01-12',
        documentUrl: '/documents/payslip-john-smith.pdf',
        reason: 'Required for bank loan application'
      },
      {
        id: '2',
        staffId: 'STAFF001',
        staffName: 'John Smith',
        staffEmail: 'john.smith@company.com',
        department: 'Care Services',
        documentType: 'experience-letter',
        requestDate: '2025-01-08',
        status: 'pending',
        reason: 'Needed for new job application'
      },
      {
        id: '3',
        staffId: 'STAFF001',
        staffName: 'John Smith',
        staffEmail: 'john.smith@company.com',
        department: 'Care Services',
        documentType: 'appointment-letter',
        requestDate: '2025-01-05',
        status: 'rejected',
        adminNotes: 'Original appointment letter is not available in digital format. Please contact HR for physical copy.',
        reason: 'Personal records'
      }
    ];
    setRequests(mockRequests);
  }, []);

  const handleSubmitRequest = (newRequest: Omit<DocumentRequest, 'id' | 'requestDate' | 'status'>) => {
    const request: DocumentRequest = {
      ...newRequest,
      id: Date.now().toString(),
      requestDate: moment().format('YYYY-MM-DD'),
      status: 'pending'
    };
    
    setRequests(prev => [request, ...prev]);
    setShowForm(false);
  };

  const handleViewDocument = (request: DocumentRequest) => {
    setSelectedRequest(request);
  };

  const handleDownloadDocument = async (request: DocumentRequest) => {
    try {
      let pdfComponent;
      
      switch (request.documentType) {
        case 'payslip':
          pdfComponent = <PayslipPDF request={request} />;
          break;
        case 'experience-letter':
          pdfComponent = <ExperienceLetterPDF request={request} />;
          break;
        case 'appointment-letter':
          pdfComponent = <AppointmentLetterPDF request={request} />;
          break;
        case 'job-contract':
          pdfComponent = <JobContractPDF request={request} />;
          break;
        default:
          pdfComponent = <PayslipPDF request={request} />;
      }
      
      const blob = await pdf(pdfComponent).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = `${request.documentType}-${request.staffName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.staffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.documentType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div >
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Requests</h1>
              <p className="mt-2 text-gray-600">
                Request and manage your HR documents
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-supperagent text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>New Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* Request Form */}
        {showForm && (
          <div className="mb-8">
            <DocumentRequestForm onSubmitRequest={handleSubmitRequest} />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Requests</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="payslip">Payslip</option>
                <option value="experience-letter">Experience Letter</option>
                <option value="appointment-letter">Appointment Letter</option>
                <option value="job-contract">Job Contract</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Request List */}
        <DocumentRequestList
          requests={filteredRequests}
          onViewDocument={handleViewDocument}
          onDownloadDocument={handleDownloadDocument}
        />

        {/* Document Viewer Modal */}
        {selectedRequest && (
          <DocumentViewer
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onDownload={() => handleDownloadDocument(selectedRequest)}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentRequestPage;