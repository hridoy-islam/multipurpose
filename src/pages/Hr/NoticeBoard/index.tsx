import { useEffect, useState } from 'react';
import { Pen, Plus } from 'lucide-react';
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
import { NoticeDialog } from './Components/noticeDialog';

export default function NoticeBoard() {
  const [notice, setNotice] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>();
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial loading
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      if (initialLoading) setInitialLoading(true);
      const response = await axiosInstance.get(`/hr/notice`, {
        params: {
          page,
          limit: entriesPerPage,
          ...(searchTerm ? { searchTerm } : {})
        }
      });
      setNotice(response.data.data.result);
      setTotalPages(response.data.data.meta.totalPage);
    } catch (error) {
      console.error('Error fetching Notice:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      let response;
      if (editingNotice) {
        // Update institution
        response = await axiosInstance.patch(
          `/hr/notice/${editingNotice?._id}`,
          data
        );
      } else {
        // Create new institution

        response = await axiosInstance.post(`/hr/notice`, data);
      }

      // Check if the API response indicates success
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

      // Refresh data
      fetchData(currentPage, entriesPerPage);
      setEditingNotice(undefined); // Reset editing state
    } catch (error) {
      toast({
        title: 'An error occurred. Please try again.',
        className: 'bg-red-500 border-none text-white'
      });
    }
  };

    const handleStatusChange = async (id, status) => {
      try {
        const updatedStatus = status ? 'active' : 'inactive';
        await axiosInstance.patch(`/hr/notice/${id}`, {
          status: updatedStatus
        });
        toast({
          title: 'Record updated successfully',
          className: 'bg-supperagent border-none text-white'
        });
        fetchData(currentPage, entriesPerPage);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchData(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  const handleSearch = () => {
    fetchData(currentPage, entriesPerPage, searchTerm);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Notice</h1>
        <Button
          className="bg-supperagent text-white hover:bg-supperagent/90"
          size={'sm'}
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Notice
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Notice Type"
          className="h-8 max-w-[400px]"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="min-w-[100px] border-none bg-supperagent text-white hover:bg-supperagent/90"
        >
          Search
        </Button>
      </div>

      <div className="rounded-md bg-white p-4 shadow-2xl">
        {initialLoading ? (
          <div className="flex justify-center py-6">
            <BlinkingDots size="large" color="bg-supperagent" />
          </div>
        ) : notice.length === 0 ? (
          <div className="flex justify-center py-6 text-gray-500">
            No records found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notice Type</TableHead>
                <TableHead>Notice Description</TableHead>
                <TableHead>Notice Date</TableHead>
                <TableHead>Notice By</TableHead>
                <TableHead className="w-32 text-center">Status</TableHead>
                <TableHead className="w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notice.map((notice) => (
                <TableRow key={notice._id}>
                  <TableCell>{notice.noticeType}</TableCell>
                  <TableCell>{notice.noticeDescription}</TableCell>
                  <TableCell>
                    {moment(notice.noticeDate).format('MMMM Do YYYY')}
                  </TableCell>
                  <TableCell>{notice.noticeBy}</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={notice.status == 'active'}
                      onCheckedChange={(checked) =>
                        handleStatusChange(notice._id, checked)
                      }
                      className="mx-auto"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      className="border-none bg-supperagent text-white hover:bg-supperagent/90"
                      size="icon"
                      onClick={() => handleEdit(notice)}
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
      <NoticeDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingNotice(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={editingNotice}
      />
    </div>
  );
}
