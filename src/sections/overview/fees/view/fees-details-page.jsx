import { Container } from '@mui/system';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

const FeesDetailsPage = () => {
  const settings = useSettingsContext();
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {/* <CustomBreadcrumbs
          heading="Fees"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User', href: paths.dashboard.user.root },
            { name: user?.displayName },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        /> */}
              
      </Container>
    </>
  );
};

export default FeesDetailsPage;
