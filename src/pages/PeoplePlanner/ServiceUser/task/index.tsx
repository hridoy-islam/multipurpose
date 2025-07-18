import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, subDays, addDays } from 'date-fns';
import Select from 'react-select';
import { Calendar as CalendarIcon, Search, Loader2, EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  User,
  MapPin,
  Briefcase,
  FileText,
  CalendarDays,
  Clock,
  BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Job = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'allocated' | 'completed' | 'cancelled';
};

type Employee = {
  id: string;
  name: string;
  position: string;
  skills: string[];
};

type ServiceUser = {
  id: string;
  name: string;
  address: string;
  carePlan: string;
};

const fetchServiceUser = async (userId: string): Promise<ServiceUser> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    id: userId,
    name: 'John Smith',
    address: '123 Main St, London, UK',
    carePlan: 'Requires assistance with morning and evening routines. Medication management needed twice daily.'
  };
};

const fetchJobs = async (
  userId: string,
  dateRange: { from: Date; to: Date }
): Promise<Job[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data for the specific service user
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Morning Visit',
      description: 'Assist with morning routine and medication',
      startTime: addDays(new Date(), 1),
      endTime: addDays(new Date(), 1),
      status: 'pending'
    },
    {
      id: '2',
      title: 'Afternoon Care',
      description: 'Prepare lunch and provide companionship',
      startTime: addDays(new Date(), 2),
      endTime: addDays(new Date(), 2),
      status: 'pending'
    },
    {
      id: '3',
      title: 'Evening Support',
      description: 'Assist with dinner and bedtime routine',
      startTime: addDays(new Date(), 3),
      endTime: addDays(new Date(), 3),
      status: 'allocated'
    },
    {
      id: '4',
      title: 'Weekly Check-in',
      description: 'Full assessment and care plan review',
      startTime: addDays(new Date(), 7),
      endTime: addDays(new Date(), 7),
      status: 'pending'
    }
  ];

  // Filter by date range
  return mockJobs.filter((job) => {
    return job.startTime >= dateRange.from && job.startTime <= dateRange.to;
  });
};

const fetchEmployees = async (): Promise<Employee[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data
  return [
    {
      id: '1',
      name: 'Sarah Williams',
      position: 'Care Assistant',
      skills: ['Dementia', 'Mobility']
    },
    {
      id: 'e2',
      name: 'David Miller',
      position: 'Senior Carer',
      skills: ['Palliative', 'Diabetes']
    },
    {
      id: 'e3',
      name: 'Emma Davis',
      position: 'Support Worker',
      skills: ['Autism', 'Epilepsy']
    }
  ];
};

export default function ServiceUserTasks({ userId }: { userId: string }) {
  const navigate= useNavigate()
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: addDays(new Date(), 14)
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch service user details
  const { data: serviceUser } = useQuery({
    queryKey: ['serviceUser', userId],
    queryFn: () => fetchServiceUser(userId)
  });

  // Fetch jobs for this service user
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', userId, dateRange],
    queryFn: () => fetchJobs(userId, dateRange),
    keepPreviousData: true
  });

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    enabled: isDialogOpen
  });

  const handleAllocate = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleConfirmAllocation = () => {
    // Here you would typically make an API call to save the allocation
    console.log(
      `Allocating job ${selectedJob?.id} to employee ${selectedEmployee?.id}`
    );
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  const getStatusBadge = (status: Job['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'allocated':
        return (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            Allocated
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            Completed
          </Badge>
        );
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!serviceUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }



 

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <span>{serviceUser.name}'s Care Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          
          

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs?.length ? (
                    jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="line-clamp-1 cursor-help hover:underline">
                                  {job.description}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px]">
                                <p>{job.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          {format(job.startTime, 'MMM dd, yyyy')}
                          <br />
                          {format(job.startTime, 'hh:mm a')} -{' '}
                          {format(job.endTime, 'hh:mm a')}
                        </TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                           onClick={()=> navigate(`${job._id}`)}
                           
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No tasks scheduled for this period
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

     
    </div>
  );
}