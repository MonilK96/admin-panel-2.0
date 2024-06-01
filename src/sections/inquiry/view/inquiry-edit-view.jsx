import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InquiryNewEditForm from '../inquiry-new-edit-form';

export default function InquiryEditView({ id }) {
  const settings = useSettingsContext();


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Inquiry',
            href: paths.dashboard.inquiry.root,
          },
        //   { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InquiryNewEditForm  />
    </Container>
  );
}

InquiryEditView.propTypes = {
  id: PropTypes.string,
};
