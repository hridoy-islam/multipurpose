import { FileText, Download, Eye, Calendar, DollarSign, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
interface PayslipsListProps {
  onViewPayslip: (payslip: any) => void;
  onDownloadPayslip: (payslip: any) => void;
}
export const PayslipsList = ({ onViewPayslip, onDownloadPayslip }: PayslipsListProps)  => {
  const payslips = [
    {
      month: 'December 2023',
      payPeriod: '01 Dec - 31 Dec 2023',
      grossPay: '£2,850.00',
      netPay: '£2,280.00',
      hoursWorked: '160.0',
      status: 'available',
      payDate: '31 Dec 2023'
    },
    {
      month: 'November 2023',
      payPeriod: '01 Nov - 30 Nov 2023',
      grossPay: '£2,710.00',
      netPay: '£2,168.00',
      hoursWorked: '152.5',
      status: 'available',
      payDate: '30 Nov 2023'
    },
    {
      month: 'October 2023',
      payPeriod: '01 Oct - 31 Oct 2023',
      grossPay: '£2,920.00',
      netPay: '£2,336.00',
      hoursWorked: '164.0',
      status: 'available',
      payDate: '31 Oct 2023'
    },
    {
      month: 'September 2023',
      payPeriod: '01 Sep - 30 Sep 2023',
      grossPay: '£2,680.00',
      netPay: '£2,144.00',
      hoursWorked: '150.5',
      status: 'available',
      payDate: '30 Sep 2023'
    },
    {
      month: 'August 2023',
      payPeriod: '01 Aug - 31 Aug 2023',
      grossPay: '£2,775.00',
      netPay: '£2,220.00',
      hoursWorked: '156.0',
      status: 'available',
      payDate: '31 Aug 2023'
    },
    {
      month: 'July 2023',
      payPeriod: '01 Jul - 31 Jul 2023',
      grossPay: '£2,850.00',
      netPay: '£2,280.00',
      hoursWorked: '160.0',
      status: 'available',
      payDate: '31 Jul 2023'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Monthly Payslips
          <Badge className="bg-blue-100 text-blue-800 ml-2">
            {payslips.length} Available
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Security Notice</span>
          </div>
          <p className="text-sm text-blue-700">
            Your payslips are securely encrypted and accessible only to you. All downloads are logged for security purposes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Hours Worked</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Pay Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((payslip, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{payslip.month}</div>
                      <div className="text-sm text-gray-500">{payslip.payPeriod}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payslip.hoursWorked}h</TableCell>
                  <TableCell className="font-semibold text-gray-900">{payslip.grossPay}</TableCell>
                  <TableCell className="font-semibold text-green-600">{payslip.netPay}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {payslip.payDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payslip.status)}>
                      <span className="capitalize">{payslip.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell >
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => onViewPayslip(payslip)}
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => onDownloadPayslip(payslip)}
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Year to Date Summary (2023)</p>
              <p>Total Gross Pay: <span className="font-semibold text-gray-900">£33,420.00</span></p>
              <p>Total Net Pay: <span className="font-semibold text-green-600">£26,736.00</span></p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download P60
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};