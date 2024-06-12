
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';


import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StudentCreateView from 'src/sections/student/view/student-create-view';

// ----------------------------------------------------------------------

export default function StudentEditView() {
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
            name: 'Student List',
            href: paths.dashboard.student.list,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <StudentCreateView  />
    </Container>
  );
}
