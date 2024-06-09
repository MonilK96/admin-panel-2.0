import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import StudentAccountBillingPlan from './student-account-billing-plan';
import StudentAccountBillingPayment from './student-account-billing-payment';
import StudentAccountBillingHistory from './student-account-billing-history';
import StudentAccountBillingAddress from './student-account-billing-address';
import { Container } from '@mui/system';

// ----------------------------------------------------------------------

export default function StudentAccountBilling({ cards, plans, invoices, addressBook }) {
  return (
    <Container maxWidth="xl">
      <StudentAccountBillingAddress addressBook={addressBook} />
    </Container>
  );
}

StudentAccountBilling.propTypes = {
  addressBook: PropTypes.array,
  cards: PropTypes.array,
  invoices: PropTypes.array,
  plans: PropTypes.array,
};
