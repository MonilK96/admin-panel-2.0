import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// SETTING PROFILE
import UserProfile from 'src/pages/dashboard/profile/profile';

// BATCH
import BatchListPage from 'src/pages/dashboard/batches/list';
import BatchCreatePage from 'src/pages/dashboard/batches/create';
import BatchEditPage from 'src/pages/dashboard/batches/edit';

// EXPENSE
import ExpenseListPage from 'src/pages/dashboard/expenses/list';
import ExpensesCreatePage from 'src/pages/dashboard/expenses/create';
import ExpensesEditPage from 'src/pages/dashboard/expenses/edit';
import ExaminationListPage from 'src/pages/dashboard/examination/list';
import ExaminationCreatePage from 'src/pages/dashboard/examination/create';
import ExaminationEditPage from 'src/pages/dashboard/examination/edit';

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const FeesPage = lazy(() => import('src/pages/dashboard/fees'));

// Inquiry
const InquiryListPage = lazy(() => import('src/pages/dashboard/inquiry/list'));
const InquiryCreatePage = lazy(() => import('src/pages/dashboard/inquiry/new'));
const InquiryEditPage = lazy(() => import('src/pages/dashboard/inquiry/edit'));

// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));

// DEMO
const DemoListPage = lazy(() => import('src/pages/dashboard/demo/list'));

// SEMINAR
const SeminarListPage = lazy(() => import('src/pages/dashboard/seminar/list'));

// ATTENDANCE
const AttendanceListPage = lazy(() => import('src/pages/dashboard/attendance/list'));

// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));

// STUDENT
const StudentProfilePage = lazy(() => import('src/pages/dashboard/student/profile'));
const StudentListPage = lazy(() => import('src/pages/dashboard/student/list'));
const StudentAccountPage = lazy(() => import('src/pages/dashboard/student/account'));
const StudentCreatePage = lazy(() => import('src/pages/dashboard/student/new'));
const StudentEditPage = lazy(() => import('src/pages/dashboard/student/edit'));
const GuardianDetailsPage = lazy(() => import('src/pages/dashboard/student/guardian'));

// EMPLOYEE
const EmployeeProfilePage = lazy(() => import('src/pages/dashboard/employee/profile'));
const EmployeeCardsPage = lazy(() => import('src/pages/dashboard/employee/cards'));
const EmployeeListPage = lazy(() => import('src/pages/dashboard/employee/list'));
const EmployeeAccountPage = lazy(() => import('src/pages/dashboard/employee/account'));
const EmployeeCreatePage = lazy(() => import('src/pages/dashboard/employee/new'));
const EmployeeEditPage = lazy(() => import('src/pages/dashboard/employee/edit'));

// APP
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));

// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'fees', element: <FeesPage /> },
      {
        path: 'inquiry',
        children: [
          { element: <InquiryListPage />, index: true },
          { path: 'list', element: <InquiryListPage /> },
          { path: 'new', element: <InquiryCreatePage /> },
          { path: ':id/edit', element: <InquiryEditPage /> },
        ],
      },
      {
        path: 'student',
        children: [
          { element: <StudentProfilePage />, index: true },
          { path: 'profile', element: <StudentProfilePage /> },
          { path: 'list', element: <StudentListPage /> },
          { path: 'new', element: <StudentCreatePage /> },
          { path: ':id/edit', element: <StudentEditPage /> },
          { path: ':id/guaridiandetails', element: <GuardianDetailsPage /> },
          { path: 'account', element: <StudentAccountPage /> },
        ],
      },
      {
        path: 'employee',
        children: [
          { element: <EmployeeProfilePage />, index: true },
          { path: 'profile', element: <EmployeeProfilePage /> },
          { path: 'cards', element: <EmployeeCardsPage /> },
          { path: 'list', element: <EmployeeListPage /> },
          { path: 'new', element: <EmployeeCreatePage /> },
          { path: ':id/edit', element: <EmployeeEditPage /> },
          { path: 'account', element: <EmployeeAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'demo',
        children: [
          { element: <DemoListPage />, index: true },
          { path: 'list', element: <DemoListPage /> },
        ],
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: 'expenses',
        children: [
          { element: <ExpenseListPage />, index: true },
          { path: 'list', element: <ExpenseListPage /> },
          { path: 'new', element: <ExpensesCreatePage /> },
          { path: ':id/edit', element: <ExpensesEditPage /> },
        ],
      },
      {
        path: 'examination',
        children: [
          { element: <ExaminationListPage />, index: true },
          { path: 'list', element: <ExaminationListPage /> },
          { path: 'new', element: <ExaminationCreatePage /> },
          { path: ':id/edit', element: <ExaminationEditPage /> },
        ],
      },
      {
        path: 'batches',
        children: [
          { element: <BatchListPage />, index: true },
          { path: 'list', element: <BatchListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
          { path: 'new', element: <BatchCreatePage /> },
          { path: ':id/edit', element: <BatchEditPage /> },
        ],
      },
      {
        path: 'seminar',
        children: [
          { element: <SeminarListPage />, index: true },
          { path: 'list', element: <SeminarListPage /> },
        ],
      },
      {
        path: 'attendance',
        children: [
          { element: <AttendanceListPage />, index: true },
          { path: 'list', element: <AttendanceListPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
    ],
  },
];
