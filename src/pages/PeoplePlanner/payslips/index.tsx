import { useState } from 'react';
import { PayslipsHeader } from './components/PayslipsHeader';
import { PayslipsOverview } from './components/PayslipsOverview';
import { PayslipsList } from './components/PayslipsList';
import { PayslipViewer } from './components/PayslipViewer';

export const PayslipsPage = () => {
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewPayslip = (payslip: any) => {
    setSelectedPayslip(payslip);
    setIsViewerOpen(true);
  };

  const handleDownloadPayslip = (payslip: any) => {
    // In a real app, this would download the PDF
    console.log('Downloading payslip:', payslip.month);
    // Create a mock download
    const blob = new Blob([`Payslip for ${payslip.month}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payslip-${payslip.month.toLowerCase().replace(' ', '-')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedPayslip(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className=" ">
        {/* Payslips Overview Stats */}
        <div className="mb-8">
          <PayslipsOverview />
        </div>
        
        {/* Payslips List */}
        <PayslipsList 
          onViewPayslip={handleViewPayslip}
          onDownloadPayslip={handleDownloadPayslip}
        />
      </main>

      {/* Payslip Viewer Modal */}
      <PayslipViewer 
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        payslip={selectedPayslip}
        onDownloadPayslip={handleDownloadPayslip}
      />
    </div>
  );
};