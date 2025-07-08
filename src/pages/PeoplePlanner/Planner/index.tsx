import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';
import { RightSidebar } from './components/RightSidebar';
import { TopControls } from './components/TopControls';
import { Timeline } from './components/Timeline';
import { serviceUsers, employees, tasks, dayStats } from '@/data/plannerData';
import type { SidebarState } from '@/types/planner';

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

  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 2));
  const handleSearch = () => {}; // Already handled in the filtering

  // Filter tasks based on status
  const filteredTasks = useMemo(() => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  }, [status]);

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

  return (
    <div className="h-full">
      <div className="py-1">
        <h1 className="text-3xl font-semibold">Planner</h1>
      </div>
      <TooltipProvider>
        <div className="flex flex-col justify-between bg-white p-2 lg:flex-row">
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
              contentRef={contentRef}
            />
          </div>

          <RightSidebar
            isOpen={sidebarOpen.right}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            currentData={currentData}
            dayStats={dayStats}
          />
        </div>
      </TooltipProvider>
    </div>
  );
}
