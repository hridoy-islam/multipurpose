import type { ServiceUser, Employee, Task, DayStats } from '@/types/planner';

export const serviceUsers: ServiceUser[] = [
  {
    id: '1',
    name: 'Avis, Louise',
    initials: 'LA',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '2',
    name: 'Begum, Jafara (Jafara)',
    initials: 'JB',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '3',
    name: 'Begum, Saleha (Saleha)',
    initials: 'SB',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '4',
    name: 'Bhatt, Jyoti Champakial (Jyo)',
    initials: 'JB',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '5',
    name: 'Bhatt, Yogita (Yogita Bhatt)',
    initials: 'YB',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '6',
    name: 'Choudhuri, Ambia khanam (J)',
    initials: 'AC',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  },
  {
    id: '7',
    name: 'De Horne-Rowland, Robert (R)',
    initials: 'RD',
    type: 'Individual',
    care: 'Everycare Romford, Care'
  }
];

export const employees: Employee[] = [
  {
    id: '8',
    name: 'Ahmjane, Zahra',
    initials: 'ZA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  },
  {
    id: '9',
    name: 'Akter, Amena (Amena Akter Anu)',
    initials: 'AA',
    role: 'HCA',
    care: 'Everycare Romford, Care'
  },
  {
    id: '10',
    name: 'AKTER, FARHANA',
    initials: 'FA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  },
  {
    id: '11',
    name: 'Akter, Nahida (Nahida)',
    initials: 'NA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  },
  {
    id: '12',
    name: 'Akter, Sharmin',
    initials: 'SA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  },
  {
    id: '13',
    name: 'Akter, Shirin',
    initials: 'SA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  },
  {
    id: '14',
    name: 'Akter, Tahima (Tahima)',
    initials: 'TA',
    role: 'Care Worker',
    care: 'Everycare Romford, Care'
  }
];

export const schedules: Task[] = [
  // Original 4 tasks for user with id '2'
  {
    id: '1',
    title: 'Care-AM',
    startTime: '08:00',
    endTime: '09:30',
    type: 'service-user',
    assigneeId: '1',
    serviceType: 'Care - AM Visit',
    status: 'allocated',
    color: 'bg-green-400',  // green for allocated
    date: '2025-07-07',
  },
  {
    id: '2',
    title: 'Care-Lunch',
    startTime: '10:00',
    endTime: '14:00',
    type: 'service-user',
    assigneeId: '1',
    serviceType: 'Care - Lunch Visit',
    status: 'allocated',
    color: 'bg-green-400',
    date: '2025-07-07',
  },
  {
    id: '3',
    title: 'Care-PM',
    startTime: '14:30',
    endTime: '15:15',
    type: 'service-user',
    assigneeId: '1',
    serviceType: 'Care - PM Visit',
    status: 'allocated',
    color: 'bg-green-400',
    date: '2025-07-18',
  },
  {
    id: '4',
    title: 'Care-Night',
    startTime: '1:00',
    endTime: '10:00',
    type: 'service-user',
    assigneeId: '1',
    serviceType: 'Care - Night Visit',
    status: 'unallocated',
    color: 'bg-green-400',
    date: '2025-07-18',
  },

  // Generate 26 more tasks for different users & employees
  ...Array.from({ length: 26 }, (_, i) => {
    const taskId = i + 5;
    const isServiceUser = taskId % 2 === 0; // even ids assigned to service users, odd to employees
    const assigneeList = isServiceUser ? ['1','3','4','5','6','7'] : ['8','9','10','11','12','13','14'];
    const assigneeId = assigneeList[taskId % assigneeList.length];

    // Random start hour from 7 to 18
    const startHour = 7 + (taskId % 12);
    const startTime = `${startHour.toString().padStart(2,'0')}:00`;
    const endHour = startHour + 1 + (taskId % 3); // 1 to 3 hours duration
    const endTime = `${endHour.toString().padStart(2,'0')}:00`;

    // Randomly decide if allocated or not (for demo, you can customize)
    const status: "allocated" | "unallocated" = taskId % 4 === 0 ? 'unallocated' : 'allocated';

    // Set color based on status
    const color = status === 'allocated' ? 'bg-green-400' : 'bg-red-400';

    return {
      id: taskId.toString(),
      title: isServiceUser ? `Care Task ${taskId}` : `Employee Task ${taskId}`,
      startTime,
      endTime,
      type: isServiceUser ? 'service-user' as const : 'employee' as const,
      assigneeId,
      serviceType: isServiceUser ? `Care Visit ${taskId}` : `Employee Duty ${taskId}`,
      status,
      color,
      date: '2025-07-07',
    };
  }),
];



export const dayStats: DayStats[] = [
  { date: '07/07', day: 'Mon', unallocated: 40, allocated: 2, total: 42 },
  { date: '08/07', day: 'Tue', unallocated: 36, allocated: 6, total: 42 },
  { date: '09/07', day: 'Wed', unallocated: 37, allocated: 3, total: 40 },
  { date: '10/07', day: 'Thu', unallocated: 37, allocated: 3, total: 40 },
  { date: '11/07', day: 'Fri', unallocated: 36, allocated: 3, total: 39 },
  { date: '12/07', day: 'Sat', unallocated: 32, allocated: 3, total: 35 },
  { date: '13/07', day: 'Sun', unallocated: 30, allocated: 3, total: 33 }
];