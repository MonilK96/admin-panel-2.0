import { Helmet } from 'react-helmet-async';

import { EmployeeListView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

export default function EmployeeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Employee List</title>
      </Helmet>

      <EmployeeListView />
    </>
  );
}
