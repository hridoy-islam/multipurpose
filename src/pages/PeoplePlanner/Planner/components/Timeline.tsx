import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { ServiceUser, Employee, Task } from '@/types/planner';
import { employees } from '@/data/plannerData';
import moment from 'moment';

interface TimelineProps {
  currentData: (ServiceUser | Employee)[];
  filterBy: string;
  tasks: Task[];
  zoomLevel: number;
  contentRef: React.RefObject<HTMLDivElement>;
}

export function Timeline({
  currentData,
  filterBy,
  tasks,
  zoomLevel,
  contentRef
}: TimelineProps) {
  const [selectedUser, setSelectedUser] = useState<ServiceUser | Employee | null>(null);
  
  const SLOT_WIDTH = zoomLevel * 2;
  const userListRef = useRef<HTMLDivElement>(null);
  const isUserScroll = useRef(false);
  const isContentScroll = useRef(false);

  // Generate time slots (always 24 hours)
  const timeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return `${hour}:00`;
    });
  }, []);

  // Generate past 7 days for selected user view
  const past7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, 'days');
      days.push({
        date: date.format('YYYY-MM-DD'),
        displayDate: date.format('ddd DD/MM'),
        fullDate: date.format('dddd DD/MM/YYYY'),
        isToday: i === 0
      });
    }
    return days;
  }, []);

  // Synchronize scrolling between user list and timeline content
  useEffect(() => {
    const userList = userListRef.current;
    const content = contentRef.current;

    if (!userList || !content) return;

    const handleUserListScroll = () => {
      if (!isContentScroll.current) {
        isUserScroll.current = true;
        content.scrollTop = userList.scrollTop;
        setTimeout(() => (isUserScroll.current = false), 100);
      }
    };

    const handleContentScroll = () => {
      if (!isUserScroll.current) {
        isContentScroll.current = true;
        userList.scrollTop = content.scrollTop;
        setTimeout(() => (isContentScroll.current = false), 100);
      }
    };

    userList.addEventListener('scroll', handleUserListScroll);
    content.addEventListener('scroll', handleContentScroll);

    return () => {
      userList.removeEventListener('scroll', handleUserListScroll);
      content.removeEventListener('scroll', handleContentScroll);
    };
  }, [contentRef]);

  // Handle user selection
  const handleUserClick = (user: ServiceUser | Employee) => {
    setSelectedUser(user);
  };

  // Handle back to main view
  const handleBackToMain = () => {
    setSelectedUser(null);
  };

  // Get task position for daily view (hours)
  const getTaskPosition = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const startPosition = (startTotalMinutes / 60) * SLOT_WIDTH;
    const duration = ((endTotalMinutes - startTotalMinutes) / 60) * SLOT_WIDTH;

    return { left: `${startPosition}rem`, width: `${duration}rem` };
  };

  // Get current display data (users or days)
  const displayData = useMemo(() => {
    if (selectedUser) {
      return past7Days;
    }
    return currentData;
  }, [selectedUser, currentData, past7Days]);

  // Get filtered tasks for current view
  const filteredTasks = useMemo(() => {
    let baseTasks = tasks;

    if (selectedUser) {
      // Filter tasks for selected user in the past 7 days
      const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
      baseTasks = tasks.filter(task => {
        const taskDate = moment(task.date || moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');
        return task.assigneeId === selectedUser.id && taskDate.isSameOrAfter(sevenDaysAgo);
      });
    } else {
      // Filter for current day only
      const today = moment().format('YYYY-MM-DD');
      baseTasks = tasks.filter(task => {
        const taskDate = task.date || today;
        return taskDate === today;
      });
    }

    // Apply additional filters
    if (filterBy !== 'All') {
      baseTasks = baseTasks.filter(task => 
        task.type === (filterBy === 'Service User' ? 'service-user' : 'employee')
      );
    }

    return baseTasks;
  }, [tasks, selectedUser, filterBy]);

  const today = useMemo(() => moment().format('dddd DD/MM/YYYY'), []);

  // Helper to calculate duration in minutes from startTime and endTime strings like '08:00'
  function getDurationMinutes(startTime: string, endTime: string) {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    if (end.isBefore(start)) {
      end.add(1, 'day');
    }
    return moment.duration(end.diff(start)).asMinutes();
  }

  const totalMinutes = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      return acc + getDurationMinutes(task.startTime, task.endTime);
    }, 0);
  }, [filteredTasks]);

  const allocatedMinutes = useMemo(() => {
    return filteredTasks
      .filter((task) => task.status === 'allocated')
      .reduce((acc, task) => {
        return acc + getDurationMinutes(task.startTime, task.endTime);
      }, 0);
  }, [filteredTasks]);

  const unallocatedMinutes = totalMinutes - allocatedMinutes;

  // Format minutes to 'HHhrs MMmin'
  function formatDuration(minutes: number) {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hrs.toString().padStart(2, '0')}hrs ${mins
      .toString()
      .padStart(2, '0')}min`;
  }

  return (
    <div className="flex w-full flex-col overflow-hidden">
      {/* Header Info */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToMain}
                className="flex items-center gap-1 text-xs"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to All Users
              </Button>
            )}
            <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
              {!selectedUser ? (
                <>
                  <Clock className="h-3 w-3" />
                  {today}
                </>
              ) : (
                <>
                  <Calendar className="h-3 w-3" />
                  {selectedUser.name} - Past 7 Days
                </>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-600">
            Total: {formatDuration(totalMinutes)} | 
            Unallocated: {formatDuration(unallocatedMinutes)} | 
            Allocated: {formatDuration(allocatedMinutes)}
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed User/Date Column */}
        <div className="flex w-20 flex-shrink-0 flex-col border-r border-gray-200 bg-white sm:w-48">
          <div className="h-8 flex-shrink-0 border-b border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {!selectedUser ? 'Users' : 'Days'}
            </span>
          </div>

          <div
            ref={userListRef}
            className="overflow-y-auto"
          >
            {!selectedUser ? (
              // User list view
              currentData.map((item, index) => {
                const isServiceUser = 'type' in item;
                const taskCount = filteredTasks.filter(task => task.assigneeId === item.id).length;

                return (
                  <div
                    key={item.id}
                    className={`flex h-10 items-center gap-2 p-1 sm:h-12 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } rounded-md transition-colors hover:bg-gray-100 cursor-pointer`}
                    onClick={() => handleUserClick(item)}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                          isServiceUser
                            ? 'bg-teal-100 text-teal-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.initials}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          {isServiceUser ? item.type : (item as Employee).role}
                        </p>
                        {taskCount > 0 && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            {taskCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Days list view for selected user
              past7Days.map((day, index) => {
                const dayTasks = filteredTasks.filter(task => 
                  (task.date || moment().format('YYYY-MM-DD')) === day.date
                );

                return (
                  <div
                    key={day.date}
                    className={`flex h-10 items-center gap-2 p-1 sm:h-12 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } ${day.isToday ? 'ring-1 ring-blue-200 bg-blue-50' : ''} rounded-md`}
                  >
                    {/* Date indicator */}
                    <div className="flex-shrink-0">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                          day.isToday
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {moment(day.date).format('DD')}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm font-medium ${
                        day.isToday ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {day.displayDate}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          {day.isToday ? 'Today' : moment(day.date).fromNow()}
                        </p>
                        {dayTasks.length > 0 && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            {dayTasks.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Scrollable Timeline Content */}
        <div
          className="flex-1 overflow-auto"
          ref={contentRef}
          style={{ overflowY: 'auto' }}
        >
          {/* Time Header */}
          <div
            className="sticky top-0 z-50 border-b border-gray-200 bg-white"
            style={{ width: `${timeSlots.length * SLOT_WIDTH}rem` }}
          >
            <div className="flex" style={{ width: `${timeSlots.length * SLOT_WIDTH}rem` }}>
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 border-l border-gray-200 py-2 text-center text-xs text-gray-500"
                  style={{ width: `${SLOT_WIDTH}rem` }}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Rows with Tasks */}
          <div
            className="divide-y divide-gray-200"
            style={{ width: `${timeSlots.length * SLOT_WIDTH}rem` }}
          >
            {!selectedUser ? (
              // User rows view
              currentData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative h-10 sm:h-12 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  {/* Grid Lines */}
                  <div className="pointer-events-none absolute inset-0 flex">
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-full border-l border-gray-200"
                        style={{ width: `${SLOT_WIDTH}rem` }}
                      />
                    ))}
                  </div>

                  {/* Tasks */}
                  {filteredTasks
                    .filter(task => task.assigneeId === item.id)
                    .map((task) => {
                      const position = getTaskPosition(task.startTime, task.endTime);
                      
                      return (
                        <ContextMenu key={task.id}>
                          <ContextMenuTrigger asChild>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute top-1 h-6 shadow-lg sm:h-10 ${task.color} z-20 cursor-pointer truncate rounded p-1 text-xs text-white transition-all hover:opacity-80 hover:shadow-xl`}
                                  style={position}
                                >
                                  <div className="truncate text-xs font-medium">
                                    {task.startTime}-{task.endTime}
                                  </div>
                                  <div className="truncate text-xs">{task.title}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="z-50 shadow-lg">
                                <div className="space-y-1 p-1">
                                  <p className="text-xs font-medium">{task.title}</p>
                                  <p className="text-xs">
                                    {task.startTime} - {task.endTime} ({task.duration})
                                  </p>
                                  <p className="text-xs">{task.serviceType}</p>
                                  <p className="text-xs">
                                    Status: {task.status === 'allocated' ? 'Allocated' : 'Unallocated'}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </ContextMenuTrigger>

                          <ContextMenuContent className="w-36">
                            <ContextMenuSub>
                              <ContextMenuSubTrigger className="text-xs">
                                Allocate
                              </ContextMenuSubTrigger>
                              <ContextMenuSubContent className="w-48">
                                {employees.map((employee) => (
                                  <ContextMenuItem
                                    key={employee.id}
                                    className="text-xs"
                                  >
                                    {employee.name}
                                  </ContextMenuItem>
                                ))}
                              </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuItem className="text-xs">
                              Copy
                            </ContextMenuItem>
                            <ContextMenuItem className="text-xs">
                              Cancel
                            </ContextMenuItem>
                            <ContextMenuItem className="text-xs">
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      );
                    })}
                </div>
              ))
            ) : (
              // Day rows view for selected user
              past7Days.map((day, index) => (
                <div
                  key={day.date}
                  className={`relative h-10 sm:h-12 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } ${day.isToday ? 'bg-blue-50' : ''}`}
                >
                  {/* Grid Lines */}
                  <div className="pointer-events-none absolute inset-0 flex">
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className={`h-full border-l ${
                          day.isToday ? 'border-blue-200' : 'border-gray-200'
                        }`}
                        style={{ width: `${SLOT_WIDTH}rem` }}
                      />
                    ))}
                  </div>

                  {/* Tasks for this day */}
                  {filteredTasks
                    .filter(task => (task.date || moment().format('YYYY-MM-DD')) === day.date)
                    .map((task) => {
                      const position = getTaskPosition(task.startTime, task.endTime);
                      
                      return (
                        <ContextMenu key={task.id}>
                          <ContextMenuTrigger asChild>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute top-1 h-6 shadow-lg sm:h-10 ${task.color} z-20 cursor-pointer truncate rounded p-1 text-xs text-white transition-all hover:opacity-80 hover:shadow-xl`}
                                  style={position}
                                >
                                  <div className="truncate text-xs font-medium">
                                    {task.startTime}-{task.endTime}
                                  </div>
                                  <div className="truncate text-xs">{task.title}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="z-50 shadow-lg">
                                <div className="space-y-1 p-1">
                                  <p className="text-xs font-medium">{task.title}</p>
                                  <p className="text-xs">
                                    {day.fullDate}
                                  </p>
                                  <p className="text-xs">
                                    {task.startTime} - {task.endTime} ({task.duration})
                                  </p>
                                  <p className="text-xs">{task.serviceType}</p>
                                  <p className="text-xs">
                                    Status: {task.status === 'allocated' ? 'Allocated' : 'Unallocated'}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </ContextMenuTrigger>

                          <ContextMenuContent className="w-36">
                            <ContextMenuSub>
                              <ContextMenuSubTrigger className="text-xs">
                                Allocate
                              </ContextMenuSubTrigger>
                              <ContextMenuSubContent className="w-48">
                                {employees.map((employee) => (
                                  <ContextMenuItem
                                    key={employee.id}
                                    className="text-xs"
                                  >
                                    {employee.name}
                                  </ContextMenuItem>
                                ))}
                              </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuItem className="text-xs">
                              Copy
                            </ContextMenuItem>
                            <ContextMenuItem className="text-xs">
                              Cancel
                            </ContextMenuItem>
                            <ContextMenuItem className="text-xs">
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      );
                    })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}