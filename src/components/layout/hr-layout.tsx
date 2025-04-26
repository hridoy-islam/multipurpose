import { SideNav } from '@/components/shared/side-nav';
import { Outlet } from 'react-router-dom';

export default function HrLayout() {
  return (
    <div >
      <SideNav />

      <div  className="px-4 mx-auto py-6">
        <Outlet />
      </div>
    </div>
  );
}
