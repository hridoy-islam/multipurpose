import { useEffect, useState } from 'react';
import { MoveLeft, Pen, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import axiosInstance from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { BlinkingDots } from '@/components/shared/blinking-dots';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { DynamicPagination } from '@/components/shared/DynamicPagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AttendanceDialog } from './components';
import { Card, CardContent } from '@/components/ui/card';

export default function AttendanceList() {
  const [attendence, setAttendance] = useState<any>([]);
  const [employeeRates, setEmployeeRates] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAttendence, setEditingAttendence] = useState<any>();
  const [initialLoading, setInitialLoading] = useState(true);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      if (initialLoading) setInitialLoading(true);

      // Fetch attendance data
      const response = await axiosInstance.get(`/hr/attendance`, {
        params: {
          page,
          limit: entriesPerPage,
          ...(searchTerm ? { searchTerm } : {})
        }
      });

      let fetchedData = response.data.data.result;

      fetchedData = fetchedData.filter(
        (item) => item.approvalStatus !== 'pending'
      );

      // If a date is provided, filter by that day
      if (dateParam) {
        fetchedData = fetchedData.filter((item) =>
          moment(item.clockIn).isSame(dateParam, 'day')
        );
      }

      setAttendance(fetchedData);
      setTotalPages(response.data.data.meta.totalPage);

      // Fetch employee rates data
      const ratesResponse = await axiosInstance.get('/hr/employeeRate');
      setEmployeeRates(ratesResponse.data?.data?.result);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Failed to load data',
        className: 'bg-red-500 border-none text-white'
      });
    } finally {
      setInitialLoading(false);
    }
  };

  // Helper function to get shift name for a user
  const getShiftName = (userId) => {
    const employeeRate = employeeRates.find(
      (rate) => rate.employeeId === userId
    );

    if (!employeeRate || !Array.isArray(employeeRate.shiftId)) {
      return 'Not assigned';
    }

    const shiftDescriptions = employeeRate.shiftId
      .map((shift) => {
        if (shift?.name && shift?.startTime && shift?.endTime) {
          return `${shift.name} (${shift.startTime} - ${shift.endTime})`;
        } else if (shift?.name) {
          return shift.name;
        }
        return null;
      })
      .filter(Boolean); // remove null/undefined

    return shiftDescriptions.length > 0
      ? shiftDescriptions.join(', ')
      : 'Not assigned';
  };

  const handleSubmit = async (data) => {
    try {
      let response;
      if (editingAttendence) {
        response = await axiosInstance.patch(
          `/hr/attendance/${editingAttendence?._id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`/hr/attendance/clock-in`, data);
      }

      if (response.data && response.data.success === true) {
        toast({
          title: response.data.message || 'Record Updated successfully',
          className: 'bg-supperagent border-none text-white'
        });
      } else if (response.data && response.data.success === false) {
        toast({
          title: response.data.message || 'Operation failed',
          className: 'bg-red-500 border-none text-white'
        });
      } else {
        toast({
          title: 'Unexpected response. Please try again.',
          className: 'bg-red-500 border-none text-white'
        });
      }

      fetchData(currentPage, entriesPerPage);
      setEditingAttendence(undefined);
    } catch (error) {
      toast({
        title: 'An error occurred. Please try again.',
        className: 'bg-red-500 border-none text-white'
      });
    }
  };

  const handleEdit = (notice) => {
    setEditingAttendence(notice);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchData(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage, initialLoading]);

  const handleSearch = () => {
    fetchData(currentPage, entriesPerPage, searchTerm);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { count, date } = location.state || {};

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-4">
        <Card className="w-full shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                Attendance Details
              </h1>
              <Button
                className="flex h-9 items-center gap-2 bg-supperagent text-white hover:bg-supperagent/90"
                onClick={() => navigate(-1)}
              >
                <MoveLeft className="h-4 w-4" />
                Back
              </Button>
            </div>

            <div className="flex w-full flex-row justify-start gap-12 text-sm text-gray-700 md:text-base">
              <div className="flex flex-row items-center gap-2">
                <p className="font-medium text-gray-600">Attendance Date:</p>
                <p className="font-bold text-gray-900">{date}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-medium text-gray-600">Attendance Count:</p>
                <p className="font-bold text-gray-900">{count}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md bg-white p-4 shadow-2xl">
        {initialLoading ? (
          <div className="flex justify-center py-6">
            <BlinkingDots size="large" color="bg-supperagent" />
          </div>
        ) : attendence.length === 0 ? (
          <div className="flex justify-center py-6 text-gray-500">
            No records found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Punch Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendence.map((attendence) => (
                <TableRow key={attendence._id}>
                  <TableCell>
                    {attendence?.userId?.title} {attendence?.userId?.firstName}
                  </TableCell>
                  <TableCell>{getShiftName(attendence?.userId?._id)}</TableCell>
                  <TableCell>
                    {moment(attendence?.clockIn).format('HH:mm')}
                    {attendence?.clockOut &&
                      ` - ${moment(attendence.clockOut).format('HH:mm')}`}
                  </TableCell>

                  <TableCell>
                    {attendence?.clockIn && attendence?.clockOut
                      ? (() => {
                          const duration = moment.duration(
                            moment(attendence.clockOut).diff(
                              moment(attendence.clockIn)
                            )
                          );
                          return `${duration.hours()}h ${duration.minutes()}m`;
                        })()
                      : 'In progress'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      className="border-none bg-supperagent text-white hover:bg-supperagent/90"
                      size="icon"
                      onClick={() => handleEdit(attendence)}
                    >
                      <Pen className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <DynamicPagination
          pageSize={entriesPerPage}
          setPageSize={setEntriesPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <AttendanceDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingAttendence(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={editingAttendence}
      />
    </div>
  );
}
