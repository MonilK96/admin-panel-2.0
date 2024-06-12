import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import ComplainNewForm from '../complain-new-form';

// ----------------------------------------------------------------------

export default function StudentComplainCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ComplainNewForm />
    </Container>
  );
}
