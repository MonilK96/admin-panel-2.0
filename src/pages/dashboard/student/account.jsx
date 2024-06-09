import { Helmet } from 'react-helmet-async';
import StudentAccountView from 'src/sections/student/view/student-account-view';

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Account Settings</title>
      </Helmet>
      <StudentAccountView />
    </>
  );
}
