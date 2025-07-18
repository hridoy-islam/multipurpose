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
import AttendanceReport from '@/pages/Hr/Attendance/Attendance-Report';
import CompanyDetails from '@/pages/Hr/Company-Details';
import EmailSetup from '@/pages/Hr/Email-Setup';
import CreateVacancy from '@/pages/Hr/Vacancy/CreateVacancy';
import EditVacancy from '@/pages/Hr/Vacancy/EditVacancy';
import AddApplicant from '@/pages/Hr/Vacancy/AddApplicant';
import ViewApplicant from '@/pages/Hr/Vacancy/ViewApplicants';
import RecruitApplicantForm from '@/pages/Hr/Recruitment/RecruitApplicantForm';
import CreateTraining from '@/pages/Hr/Training/CreateTraining';
import AddDesignation from '@/pages/Hr/Designation/CreateDesignation';
import EditDesignation from '@/pages/Hr/Designation/EditDesignation';
import EditTraining from '@/pages/Hr/Training/EditTraining';
import EmployeeForm from '@/pages/Hr/Recruitment/employeeForm';
import EditEmployee from '@/pages/Hr/Employee/editEmployee';
import CreateShift from '@/pages/Hr/Shift/CreateShift';
import EditShift from '@/pages/Hr/Shift/EditShift';
import EmployeeRate from '@/pages/Hr/Employee/employeeRate';
import AttendanceList from '@/pages/Hr/Attendance/attendaceList';
import AttendanceApprovalPage from '@/pages/Hr/Attendance/Attendance-Approve';
import AttendanceApproveList from '@/pages/Hr/Attendance/Attendance-Approve/attendance-list';
import EntryAttendance from '@/pages/Hr/Attendance/entry-attendance';
import ApplicantDetailPage from '@/pages/Hr/Vacancy/viewApplicant';
import LeaveApprovalPage from '@/pages/Hr/LeaveManagement/LeaveApproval';
import PeoplePlannerPage from '@/pages/PeoplePlanner';

import PeoplePlannerLayout from '@/components/layout/peoplePlanner-layout';
import CreateServiceUserPage from '@/pages/PeoplePlanner/ServiceUser/create';
import PServiceUserList from '@/pages/PeoplePlanner/ServiceUser';
import PServiceuserDetailPage from '@/pages/PeoplePlanner/ServiceUser/view-serviceUser';
import ServiceFunderList from '@/pages/PeoplePlanner/ServiceFunder';
import CreateServiceFunderPage from '@/pages/PeoplePlanner/ServiceFunder/create-funder';
import PlannerPage from '@/pages/PeoplePlanner/Planner';
import ServiceuserDetailPage from '@/pages/PeoplePlanner/ServiceUser/view-serviceUser';
import ServiceFunderDetailPage from '@/pages/PeoplePlanner/ServiceFunder/view-funder';
import JobPage from '@/pages/PeoplePlanner/Jobs';
import ServiceUserFunder from '@/pages/PeoplePlanner/ServiceUser/funder';
import CreateServiceUserFunderPage from '@/pages/PeoplePlanner/ServiceUser/funder/create-funder';
import { ReportPage } from '@/pages/PeoplePlanner/reports';
import ProfilePage from '@/pages/PeoplePlanner/profilePage';
import { NoticeBoardPage } from '@/pages/PeoplePlanner/NoticePage';
import { TrainingPage } from '@/pages/PeoplePlanner/trainingPage';
import SchedulePage from '@/pages/PeoplePlanner/Schedule';
import { PayslipsPage } from '@/pages/PeoplePlanner/payslips';
import DocumentRequestPage from '@/pages/PeoplePlanner/RequestDocument';
import InvoicePage from '@/pages/PeoplePlanner/Invoice';
import ServiceUserPlannerPage from '@/pages/PeoplePlanner/ServiceUser/planner';
import ServiceUserTask from '@/pages/PeoplePlanner/ServiceUser/task';
import ViewTaskPage from '@/pages/PeoplePlanner/ServiceUser/task/view-task';



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
              path: 'employee/:id',
              element: <EditEmployee />
            },
           
            {
              path: 'employee/:id/employee-rate',
              element: <EmployeeRate />
            },
           
            {
              path: 'department',
              element: <Department />
            },
            {
              path: 'shift',
              element: <Shift />
            },
            {
              path: 'create-shift',
              element: <CreateShift />
            },
            {
              path: 'edit-shift/:id',
              element: <EditShift />
            },
            {
              path: 'designation',
              element: <Designation />
            },
            {
              path: 'designation/create',
              element: <AddDesignation />
            },
            {
              path: 'designation/edit/:id',
              element: <EditDesignation />
            },
            {
              path: 'training',
              element: <Training />
            },
            {
              path: 'create-training',
              element: <CreateTraining />
            },
            {
              path: 'edit-training/:id',
              element: <EditTraining />
            },
            {
              path: 'attendance',
              element: <Attendance />
            },
            {
              path: 'attendance/attendance-list',
              element: <AttendanceList />
            },
            {
              path: 'attendance/attendance-entry',
              element: <EntryAttendance />
            },
            {
              path: 'attendance-approve',
              element: <AttendanceApprovalPage />
            },
            {
              path: 'attendance-approve/attendance-list',
              element: <AttendanceApproveList />
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
              path: 'leave-approve',
              element: <LeaveApprovalPage />
            },
           
            {
              path: 'notice',
              element: <NoticeBoard />
            },
            {
              path: 'vacancy',
              element: <Vacancy />,
              
            },  
            {
              path: 'create-vacancy',
              element: <CreateVacancy/>
            },     
            {
              path: 'add-applicant/:id',
              element: <AddApplicant/>
            },     
            {
              path: 'view-applicants/:id',
              element: <ViewApplicant/>
            },     
            {
              path: 'view-applicant/:id',
              element: <ApplicantDetailPage/>
            },     
            {
              path: 'recruit-applicant/:id',
              element: <RecruitApplicantForm/>
            },     
            {
              path: 'recruit-applicant/employee',
              element: <EmployeeForm/>
            },     
            {
              path: 'edit-vacancy/:id',
              element: <EditVacancy/>
            },     

            {
              path: 'recruitment',
              element: <Recruitment />
            },
            {
              path: 'candidate-list',
              element: <Recruitment />
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
        },
        {
          path: 'people-planner',
          element: <PeoplePlannerLayout />,
          children: [
            {
              element: <PeoplePlannerPage />,
              index: true
            },
        
            {
              path: 'service-user',
              element: <PServiceUserList />
            },
            {
              path: 'service-user/new',
              element: <CreateServiceUserPage />
            },
            {
              path: 'service-user/:id',
              element: <ServiceuserDetailPage />
            },
            {
              path: 'service-user/:id/planner',
              element: <ServiceUserPlannerPage />
            },
            {
              path: 'service-user/:id/tasks',
              element: <ServiceUserTask />
            },
            {
              path: 'service-user/:id/tasks/:taskId',
              element: <ViewTaskPage />
            },
            {
              path: 'service-funder',
              element: <ServiceFunderList />
            },
            {
              path: 'service-funder/new',
              element: <CreateServiceFunderPage />
            },
            {
              path: 'service-funder/:id',
              element: <ServiceFunderDetailPage />
            },
            {
              path: 'service-user/:id/funder',
              element: <ServiceUserFunder />
            },
            {
              path: 'service-user/:id/funder/create',
              element: <CreateServiceUserFunderPage />
            },
            {
              path: 'planner',
              element: <PlannerPage />
            },
            {
              path: 'jobs',
              element: <JobPage />
            },
            {
              path: 'report',
              element: <ReportPage />
            },
            {
              path: 'profile',
              element: <ProfilePage />
            },
            {
              path: 'notice',
              element: <NoticeBoardPage />
            },
            {
              path: 'training',
              element: <TrainingPage />
            },
            {
              path: 'schedule',
              element: <SchedulePage />
            },
            {
              path: 'payslip',
              element: <PayslipsPage />
            },
            {
              path: 'request/document',
              element: <DocumentRequestPage />
            },
            {
              path: 'invoice',
              element: <InvoicePage />
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
