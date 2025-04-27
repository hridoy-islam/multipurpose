import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  return (
    <div>
      <div className="mx-auto mt-5 grid w-10/12 grid-cols-4 gap-5">
        <Link to="/admin/hr" >
          <Card className='p-12 text-bold text-center text-supperagent text-xl'>Hr</Card>
        </Link>
        <Link to="/admin/hr" >
          <Card className='p-12 text-bold text-center text-supperagent text-xl'>Student</Card>
        </Link>
        <Link to="/admin/hr" >
          <Card className='p-12 text-bold text-center text-supperagent text-xl'>Applicant</Card>
        </Link>
        <Link to="/admin/hr" >
          <Card className='p-12 text-bold text-center text-supperagent text-xl'>People Planner</Card>
        </Link>     
      </div>
    </div>
  );
};
