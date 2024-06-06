import React from 'react';
import Container from '@mui/material/Container';
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';
import StudentGuardianDetails from '../student-guardian-details';

export default function GuardianView() {
  const addressBook = [1];

  return (
    <Container maxWidth="md">
      <StudentGuardianDetails addressBook={addressBook} />
    </Container>
  );
}
