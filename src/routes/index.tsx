import ProtectedRoute from '@/components/shared/ProtectedRoute';
import ForgotPassword from '@/pages/auth/forget-password';
import SignUpPage from '@/pages/auth/sign-up';


import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Otp from '@/pages/auth/otp';
import AdminLayout from '@/components/layout/admin-layout';
import { DashboardPage } from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage/';
import NewPassword from '@/pages/auth/NewPassword';
import HrPage from '@/pages/Hr';
import NoticeBoard from '@/pages/Hr/NoticeBoard';
import LeaveManagement from '@/pages/Hr/LeaveManagement';
import Vacancy from '@/pages/Hr/Vacancy';
import Profile from '@/pages/Hr/Profile';
import Holiday from '@/pages/Hr/Holidays';
import MyStuff from '@/pages/Hr/MyStuff';
import Employee from '@/pages/Hr/Employee';
import Attendance from '@/pages/Hr/Attendance';

const SignInPage = lazy(() => import('@/pages/auth/signin'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const adminRoutes = [
    {
      path: '/admin',
      element: (
        <AdminLayout>
          <ProtectedRoute>
            <Suspense>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
        </AdminLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'hr',
          element: <HrPage />,
        
        },
        {
          path: 'hr/notice',
          element: <NoticeBoard />,
        
        },
        {
          path: 'hr/leave-manage',
          element: <LeaveManagement />,
        
        },
        {
          path: 'hr/vacancy',
          element: <Vacancy />,
        
        },
        {
          path: 'hr/profile',
          element: <Profile />,
        
        },
        {
          path: 'hr/holiday',
          element: <Holiday />,
        
        },
        {
          path: 'hr/my-stuff',
          element: <MyStuff />,
        
        },
        {
          path: 'hr/employee',
          element: <Employee />,
        
        },
        {
          path: 'hr/attendance',
          element: <Attendance />,
        
        },
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/signup',
      element: <SignUpPage />,
      index: true
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
      index: true
    },
    {
      path: '/otp',
      element: <Otp />,
      index: true
    },
    
    {
      path: '/new-password',
      element: <NewPassword />,
      index: true
    },
    {
      path: '/404',
      element: <ErrorPage />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...publicRoutes, ...adminRoutes]);

  return routes;
}
