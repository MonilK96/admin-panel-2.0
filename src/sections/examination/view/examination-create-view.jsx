import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ExaminationNewForm from '../examination-new-form';


// ----------------------------------------------------------------------

export default function ExaminationCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new expense"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Examination',
            href: paths.dashboard.expenses.root,
          },
          { name: 'New Expense' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExaminationNewForm />
    </Container>
  );
}
