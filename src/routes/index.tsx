import ProtectedRoute from '@/components/shared/ProtectedRoute';
import ForgotPassword from '@/pages/auth/forget-password';
import SignUpPage from '@/pages/auth/sign-up';

import { Children, Suspense, lazy } from 'react';
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
import PayRoll from '@/pages/Hr/Payroll';
import Recruitment from '@/pages/Hr/Recruitment';
import Settings from '@/pages/Hr/Settings';
import HrLayout from '@/components/layout/hr-layout';
import Department from '@/pages/Hr/Department';
import Shift from '@/pages/Hr/Shift';
import Designation from '@/pages/Hr/Designation';
import Training from '@/pages/Hr/Training';
import AttendanceApprove from '@/pages/Hr/Attendance-Approve';
import AttendanceReport from '@/pages/Hr/Attendance-Report';
import CandidateList from '@/pages/Hr/Candidate-List';
import CompanyDetails from '@/pages/Hr/Company-Details';
import EmailSetup from '@/pages/Hr/Email-Setup';

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
          element: <HrLayout />,
          children: [
            {
              element: <HrPage />,
              index: true
            },          
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'holiday',
              element: <Holiday />
            },
            {
              path: 'my-stuff',
              element: <MyStuff />
            },
            {
              path: 'employee',
              element: <Employee />
            },
            {
              path: 'department',
              element: <Department/>
            },
            {
              path: 'shift',
              element: <Shift/>
            },
            {
              path: 'designation',
              element: <Designation />
            },
            {
              path: 'training',
              element: <Training />
            },
            {
              path: 'attendance',
              element: <Attendance />
            },
            {
              path: 'attendance-approve',
              element: <AttendanceApprove />
            },
            {
              path: 'attendance-report',
              element: <AttendanceReport />
            },
            {
              path: 'payroll',
              element: <PayRoll />
            },
            {
              path: 'leave-manage',
              element: <LeaveManagement />
            },
            {
              path: 'notice',
              element: <NoticeBoard />
            },          
            {
              path: 'vacancy',
              element: <Vacancy />
            },
            {
              path: 'recruitment',
              element: <Recruitment />
            },
            {
              path: 'candidate-list',
              element: <CandidateList />
            },
            {
              path: 'settings',
              element: <Settings />
            },
            {
              path: 'company-details',
              element: <CompanyDetails />
            },
            {
              path: 'email-setup',
              element: <EmailSetup />
            }
          ]
        }
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
