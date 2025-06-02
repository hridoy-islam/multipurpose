'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Calendar,
  Clock,
  Download,
  FileText,
  User,
  Loader
} from 'lucide-react';
import {
  getAttendanceReport,
  getUserAttendanceHistory,
  generatePDF,
  generateUserPDF
} from './components/actions';

// Types based on your Mongoose schemas
interface AttendanceUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  departmentId?: {
    name: string;
  };
  attendanceCount: number;
  totalHours: number;
  lateCount: number;
  absentCount: number;
}

interface AttendanceRecord {
  _id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  duration: string;
  status: 'present' | 'late' | 'absent' | 'half-day';
  location?: {
    address: string;
  };
  clockType?: string;
  approvalStatus?: string;
  notes?: string;
}

export default function AttendanceReport() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [reportData, setReportData] = useState<AttendanceUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AttendanceUser | null>(null);
  const [userHistory, setUserHistory] = useState<AttendanceRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Generate the attendance report
  const generateReport = async () => {
    if (!fromDate || !toDate) return;

    setIsLoading(true);
    try {
      const data = await getAttendanceReport(fromDate, toDate);
      setReportData(data);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // View user attendance history
  const viewUserHistory = async (user: AttendanceUser) => {
    setSelectedUser(user);
    setIsLoading(true);

    try {
      const history = await getUserAttendanceHistory(
        user._id,
        fromDate,
        toDate
      );
      setUserHistory(history);
      setIsHistoryOpen(true);
    } catch (error) {
      console.error('Failed to fetch user history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Download report as PDF
  const downloadReportPDF = async () => {
    if (!fromDate || !toDate || reportData.length === 0) return;

    setIsPdfLoading(true);
    try {
      await generatePDF(fromDate, toDate, reportData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsPdfLoading(false);
    }
  };

  // Download individual user report as PDF
  const downloadUserPDF = async () => {
    if (!selectedUser || !fromDate || !toDate) return;

    setIsPdfLoading(true);
    try {
      await generateUserPDF(
        selectedUser._id,
        selectedUser.firstName + ' ' + selectedUser.lastName,
        fromDate,
        toDate,
        userHistory
      );
    } catch (error) {
      console.error('Failed to generate user PDF:', error);
    } finally {
      setIsPdfLoading(false);
    }
  };
console.log(reportData)
  return (
    <div className=" mx-auto ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Attendance Report
          </CardTitle>
          <CardDescription>
            Generate attendance reports for a specific date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <form className="flex flex-wrap items-end gap-4">
              {/* From Date */}
              <div className="min-w-[200px] flex-1">
                <Label htmlFor="fromDate" className="mb-1 block font-medium">
                  From Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                  <Input
                    id="fromDate"
                    type="month"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 pl-9 focus:border-supperagent focus:ring focus:ring-supperagent/20"
                    required
                  />
                </div>
              </div>

              {/* To Date */}
              <div className="min-w-[200px] flex-1">
                <Label htmlFor="toDate" className="mb-1 block font-medium">
                  To Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                  <Input
                    id="toDate"
                    type="month"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 pl-9 focus:border-supperagent focus:ring focus:ring-supperagent/20"
                    required
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                type="button"
                onClick={generateReport}
                disabled={isLoading || !fromDate || !toDate}
                className="flex h-10 items-center gap-2 bg-supperagent px-5 py-2 text-white transition-colors hover:bg-supperagent/90 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Report'
                )}
              </Button>

              {/* Download PDF Button */}
              <Button
                type="button"
                onClick={downloadReportPDF}
                disabled={isPdfLoading || reportData.length === 0}
                className="flex h-10 items-center gap-2 bg-gray-600 px-5 py-2 text-white hover:bg-gray-700 disabled:opacity-70"
              >
                {isPdfLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Report Results */}
          {reportData.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-4 text-xl font-semibold">
                Attendance Summary ({fromDate} to {toDate})
              </h2>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-center">
                        Days Present
                      </TableHead>
                      <TableHead className="text-center">Late Days</TableHead>
                      <TableHead className="text-center">Absent Days</TableHead>
                      <TableHead className="text-center">Total Hours</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.userId.firstName} {user.userId.lastName}
                        </TableCell>
                        <TableCell>
                          {user.userId.departmentId?.departmentName || user.position || 'N/A'}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.attendanceCount}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.lateCount}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.absentCount}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.totalHours?.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewUserHistory(user)}
                          >
                            <FileText className="mr-1 h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Attendance History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              {selectedUser?.firstName} {selectedUser?.lastName} - Attendance
              History
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing attendance from {fromDate} to {toDate}
              </div>
              <Button
                onClick={downloadUserPDF}
                disabled={isPdfLoading}
                size="sm"
                className="bg-gray-600 text-white hover:bg-gray-700"
              >
                {isPdfLoading ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-3 w-3" />
                    Download User Report
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userHistory.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-gray-500" />
                          {record.clockIn}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-gray-500" />
                          {record.clockOut}
                        </div>
                      </TableCell>
                      <TableCell>{record.duration}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'late'
                                ? 'bg-yellow-100 text-yellow-800'
                                : record.status === 'absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        {record.location?.address || 'N/A'}
                      </TableCell>
                      <TableCell className="text-xs capitalize">
                        {record.clockType || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {userHistory.length > 0 && (
              <div className="mt-4 rounded-md bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-medium">Summary</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-md bg-white p-3 shadow-sm">
                    <div className="text-xs text-gray-500">Present Days</div>
                    <div className="text-lg font-semibold">
                      {userHistory.filter((r) => r.status === 'present').length}
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-3 shadow-sm">
                    <div className="text-xs text-gray-500">Late Days</div>
                    <div className="text-lg font-semibold">
                      {userHistory.filter((r) => r.status === 'late').length}
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-3 shadow-sm">
                    <div className="text-xs text-gray-500">Absent Days</div>
                    <div className="text-lg font-semibold">
                      {userHistory.filter((r) => r.status === 'absent').length}
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-3 shadow-sm">
                    <div className="text-xs text-gray-500">Total Hours</div>
                    <div className="text-lg font-semibold">
                      {userHistory
                        .reduce((total, record) => {
                          if (record.duration && record.duration !== '-') {
                            const [hours, minutes] = record.duration
                              .split(':')
                              .map(Number);
                            return total + hours + minutes / 60;
                          }
                          return total;
                        }, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
