import { X, Download, Printer as Print, DollarSign, Calendar, User, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PayslipViewerProps {
  isOpen: boolean;
  onClose: () => void;
  payslip?: any;
  onDownloadPayslip: (payslip: any) => void;
}

export const PayslipViewer = ({ 
  isOpen, 
  onClose, 
  payslip, 
  onDownloadPayslip 
}: PayslipViewerProps) => {
  if (!isOpen || !payslip) return null;

  const handlePrint = () => {
    console.log('Printing payslip:', payslip.month);
    window.print(); // This will print the current page
  };

  const handleDownload = () => {
    onDownloadPayslip(payslip);
  };
  const deductions = [
    { name: 'Income Tax', amount: '£342.00' },
    { name: 'National Insurance', amount: '£228.00' },
    { name: 'Pension Contribution', amount: '£0.00' }
  ];

  const earnings = [
    { name: 'Basic Salary', amount: '£2,400.00', hours: '160.0' },
    { name: 'Overtime', amount: '£450.00', hours: '15.0' },
    { name: 'Holiday Pay', amount: '£0.00', hours: '0.0' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white  p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Payslip - {payslip.month}</h2>
         <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handlePrint}
            >
              <Print className="h-4 w-4" />
              Print
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Company Header */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">RetailCorp Ltd</h3>
                  <p className="text-sm text-gray-600">123 Business Street, London, SW1A 1AA</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                PAID
              </Badge>
            </div>
          </div>

          {/* Employee Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4" />
                  Employee Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">John Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employee ID:</span>
                  <span className="font-medium">EMP001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">Sales</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-medium">Senior Sales Associate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Pay Period Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay Period:</span>
                  <span className="font-medium">{payslip.payPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay Date:</span>
                  <span className="font-medium">{payslip.payDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay Frequency:</span>
                  <span className="font-medium">Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Code:</span>
                  <span className="font-medium">1257L</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earnings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earnings.map((earning, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-medium text-gray-900">{earning.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({earning.hours}h)</span>
                    </div>
                    <span className="font-semibold">{earning.amount}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center py-2 font-semibold text-lg">
                  <span>Gross Pay</span>
                  <span>{payslip.grossPay}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-900">{deduction.name}</span>
                    <span className="font-semibold text-red-600">-{deduction.amount}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center py-2 font-semibold text-lg">
                  <span>Total Deductions</span>
                  <span className="text-red-600">-£570.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Net Pay Summary */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Net Pay</h3>
                  <p className="text-sm text-green-600">Amount paid to your account</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-800">{payslip.netPay}</div>
                  <p className="text-sm text-green-600">Paid on {payslip.payDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              This payslip is computer generated and does not require a signature. 
              For queries, please contact HR at hr@retailcorp.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};