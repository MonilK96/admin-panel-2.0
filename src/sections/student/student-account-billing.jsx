import PropTypes from 'prop-types';

import { Container } from '@mui/system';

import StudentAccountBillingAddress from './student-account-billing-address';

// ----------------------------------------------------------------------

export default function StudentAccountBilling({ addressBook }) {
  return (
    <Container maxWidth="xl">
      <StudentAccountBillingAddress addressBook={addressBook} />
    </Container>
  );
}

StudentAccountBilling.propTypes = {
  addressBook: PropTypes.array,
};
