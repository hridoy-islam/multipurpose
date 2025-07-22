import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  ClipboardList, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Edit3,
  Trash2,
  UserCheck,
  Mail,
  MessageSquare
} from 'lucide-react';
import type { Task } from '@/types/planner';
import moment from 'moment';

interface TaskDetailComponentProps {
  task: Task | null;
  onBack: () => void;
}

export function TaskDetailComponent({ task, onBack }: TaskDetailComponentProps) {
  if (!task) return null;

  const duration = React.useMemo(() => {
    const start = moment(task.startTime, 'HH:mm');
    const end = moment(task.endTime, 'HH:mm');
    if (end.isBefore(start)) {
      end.add(1, 'day');
    }
    const durationMinutes = moment.duration(end.diff(start)).asMinutes();
    const hrs = Math.floor(durationMinutes / 60);
    const mins = Math.round(durationMinutes % 60);
    return `${hrs}h ${mins}m`;
  }, [task.startTime, task.endTime]);

  return (
    <div className="flex h-[calc(100vh-14vh)] w-full flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"

            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-supperagent/90  "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Timeline
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold text-gray-900">Visit (Planned)</h1>
        </div>
        
        
      </div>

    </div>
  );
}