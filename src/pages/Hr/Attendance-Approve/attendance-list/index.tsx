import { useEffect, useState } from 'react';
import { MoveLeft, Pen, Plus } from 'lucide-react';
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
// import { InstitutionDialog } from './components/institution-dialog';
import axiosInstance from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { BlinkingDots } from '@/components/shared/blinking-dots';
// import { DataTablePagination } from '../students/view/components/data-table-pagination';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { DynamicPagination } from '@/components/shared/DynamicPagination';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';

// import { AttendanceDialog } from './Components';

export default function AttendanceApproveList() {
  const [attendence, setAttendance] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAttendence, setEditingAttendence] = useState<any>();
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial loading
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      if (initialLoading) setInitialLoading(true);
      const response = await axiosInstance.get(
        `/hr/attendance?approvalStatus=pending`,
        {
          params: {
            page,
            limit: entriesPerPage,
            ...(searchTerm ? { searchTerm } : {}),
            
          }
        }
      );
      setAttendance(response.data.data.result);
      setTotalPages(response.data.data.meta.totalPage);
    } catch (error) {
      console.error('Error fetching Attendance:', error);
    } finally {
      setInitialLoading(false);
    }
  };


  const handleApprove = async (attendance) => {
    try {
      // Sending a request to approve the attendance
      const response = await axiosInstance.patch(
        `/hr/attendance/${attendance._id}`, 
        { approvalStatus: 'approved' }
      );
  
      // Check if the API response indicates success
      if (response.data && response.data.success === true) {
        toast({
          title: 'Attendance approved successfully!',
          
        });
      } else if (response.data && response.data.success === false) {
        toast({
          title: 'Approval failed. Please try again.',
          className: 'bg-destructive border-none text-white'
        });
      } else {
        toast({
          title: 'Unexpected response. Please try again.',
          className: 'bg-destructive border-none text-white'
        });
      }
  
      // Refresh data to show updated attendance
      fetchData(currentPage, entriesPerPage);
  
    } catch (error) {
      console.error('Error approving attendance:', error);
      toast({
        title: 'An error occurred while approving the attendance.',
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
  }, [currentPage, entriesPerPage]);

  const handleSearch = () => {
    fetchData(currentPage, entriesPerPage, searchTerm);
  };
  const navigate = useNavigate()
  
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
                <TableHead>Punch</TableHead>
               
                <TableHead className="w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendence.map((attendence) => (
                <TableRow key={attendence._id}>
                <TableCell>
                  {attendence?.userId?.title} {attendence?.userId?.firstName}
                </TableCell>
              
                <TableCell>
                  {attendence?.clockIn
                    ? `${moment(attendence.clockIn).format('hh:mm')} - ${
                        attendence.clockOut
                          ? moment(attendence.clockOut).format('hh:mm')
                          : '00:00'
                      } ${
                        attendence.clockOut
                          ? `(${moment
                              .duration(moment(attendence.clockOut).diff(moment(attendence.clockIn)))
                              .hours()}h ${moment
                              .duration(moment(attendence.clockOut).diff(moment(attendence.clockIn)))
                              .minutes()}m)`
                          : ''
                      }`
                    : 'N/A'}
                </TableCell>
              
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="bg-supperagent text-white hover:bg-supperagent/90 p-2"
                      onClick={() => handleEdit(attendence)}
                    >
                      <Pen className="h-4 w-4" />
                    </Button> */}
              
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-supperagent text-white hover:bg-supperagent/90 px-4"
                      onClick={() => handleApprove(attendence)}
                    >
                      Approve
                    </Button>
                  </div>
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
 
    </div>
  );
}
