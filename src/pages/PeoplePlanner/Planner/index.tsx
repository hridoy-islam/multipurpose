import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';
import { RightSidebar } from './components/RightSidebar';
import { TopControls } from './components/TopControls';
import { Timeline } from './components/Timeline';
import { TaskDetailComponent } from './components/TaskDetails';
import { serviceUsers, employees, tasks, dayStats } from '@/data/plannerData';
import type { SidebarState, Task } from '@/types/planner';
import moment from 'moment';

type ViewMode = 'timeline' | 'taskDetail';

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterBy, setFilterBy] = useState('All');
  const [designation, setDesignation] = useState('All');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState<SidebarState>({
    left: true,
    right: true
  });
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 2));
  const handleSearch = () => {}; // Already handled in the filtering
  const [isDateSelected, setIsDateSelected] = useState(false);
  
  // Handle task selection
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setViewMode('taskDetail');
  };

  // Handle back to timeline
  const handleBackToTimeline = () => {
    setViewMode('timeline');
    setSelectedTask(null);
  };

  const filteredTasks = useMemo(() => {
    if (!isDateSelected) {
      // Show all tasks of the current week (Sunday to Saturday)
      const startOfWeek = moment().startOf('week'); // Sunday
      const endOfWeek = moment().endOf('week'); // Saturday

      return tasks.filter((task) => {
        const taskDate = moment(task.date);
        return taskDate.isBetween(startOfWeek, endOfWeek, 'day', '[]'); // inclusive
      });
    } else {
      return tasks.filter((task) =>
        moment(task.date).isSame(moment(selectedDate), 'day')
      );
    }
  }, [tasks, selectedDate, isDateSelected]);
  
  // Filter users based on all criteria
  const currentData = useMemo(() => {
    let result = [...serviceUsers, ...employees];
    
    // Apply filterBy
    if (filterBy === 'Service User') {
      result = serviceUsers;
    } else if (filterBy === 'Employee') {
      result = employees;
    }
    
    // Apply designation filter
    if (designation !== 'All') {
      result = result.filter(user => 
        'role' in user ? user.role === designation : false
      );
    }
    
    // Apply department filter (assuming department is a property)
    if (department !== 'All') {
      result = result.filter(user => 
        'department' in user ? user.department === department : false
      );
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) ||
        ('email' in user && user.email.toLowerCase().includes(term))
      );
    }
    
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filterBy, designation, department, searchTerm]);
  
  const selectedDateString = useMemo(() => {
    return moment(selectedDate).format('YYYY-MM-DD');
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
  };

  const dayStats = useMemo(() => {
    // Get the week containing the selected date for sidebar stats
    const selectedMoment = moment(selectedDate);
    const startOfWeek = selectedMoment.clone().startOf('week'); // Sunday
    
    // Generate stats for each day of the week containing the selected date
    const weekStats = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = startOfWeek.clone().add(i, 'days');
      const dayString = currentDay.format('YYYY-MM-DD');
      const dayTasks = tasks.filter((task) => task.date === dayString);
      
      weekStats.push({
        date: currentDay.format('DD/MM'),
        day: currentDay.format('dddd'),
        allocated: dayTasks.filter((t) => t.status === 'allocated').length,
        unallocated: dayTasks.filter((t) => t.status === 'unallocated').length,
        total: dayTasks.length
      });
    }
    
    return weekStats;
  }, [selectedDate, tasks]);

  return (
    <div className="h-full">
      <div className="py-1">
        <h1 className="text-3xl font-semibold">Planner</h1>
      </div>
      <TooltipProvider>
        <div className="flex flex-col justify-between bg-white p-2 lg:flex-row">
          {viewMode === 'timeline' ? (
            <>
              <div className="flex h-[calc(100vh-14vh)] w-full flex-col overflow-hidden lg:w-[86%]">
                <TopControls
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  zoomLevel={zoomLevel}
                  handleZoomIn={handleZoomIn}
                  handleZoomOut={handleZoomOut}
                  designation={designation}
                  setDesignation={setDesignation}
                  department={department}
                  setDepartment={setDepartment}
                  status={status}
                  setStatus={setStatus}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />

                <Timeline
                  currentData={currentData}
                  filterBy={filterBy}
                  tasks={filteredTasks}
                  zoomLevel={zoomLevel}
                  selectedDate={selectedDateString}
                  contentRef={contentRef}
                  onTaskClick={handleTaskClick}
                />
              </div>

              <RightSidebar
                isOpen={sidebarOpen.right}
                selectedDate={selectedDate}
                setSelectedDate={handleDateChange}
                currentData={currentData}
                dayStats={dayStats}
              />
            </>
          ) : (
            <TaskDetailComponent
              task={selectedTask}
              onBack={handleBackToTimeline}
            />
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}