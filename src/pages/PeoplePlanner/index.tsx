import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Announcements } from './components/Announcements';
import { PendingRequests } from './components/PendingRequests';
import { QuickActions } from './components/QuickActions';
import { StatCards } from './components/StatCards';
import { TrainingDue } from './components/TrainingDue';
import { UpcomingShifts } from './components/UpcomingShifts';
import StaffDashboardPage from './Dashboard/serviceUserDashboard';
import ServiceUserDashboardPage from './Dashboard/serviceUserDashboard';

const PeoplePlannerPage = () => {
   const user = {
    name: 'John',
    role: 'serviceUser', // change to 'serviceUser' to test other view
    title: 'Senior Sales Associate',
  };
  if (user.role === 'staff') {
    return (
      <div className="min-h-screen p-4">
        <StaffDashboardPage  user={user} />
      </div>
    );
  }
  if (user.role === 'serviceUser') {
    return (
      <div className="min-h-screen p-4">
        <ServiceUserDashboardPage  user={user} />
      </div>
    );
  }
};

export default PeoplePlannerPage;
