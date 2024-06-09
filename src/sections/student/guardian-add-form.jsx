import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// Import the countries if needed
// import { countries } from 'src/assets/data';

import FormProvider, {
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { Box } from '@mui/material';

const guardianTypes = [
  'Mother',
  'Father',
  'Aunt',
  'Uncle',
  'brother',
  'grandfather',
  'grandmother',
  'sister',
  'guardian',
  'family friend',
  'other',
  'cousin',
];

// ----------------------------------------------------------------------

export default function GuardianAddForm({ open, onClose, onCreate }) {
  const NewAddressSchema = Yup.object().shape({
    firstName: Yup.string().required('Fullname is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    guardianType: Yup.string().required('Guardian type is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    guardianType: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>New Guardian Add</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Box mt={2}>
              <RHFTextField name="firstName" label="First Name" />
            </Box>
            <RHFTextField name="lastName" label="Last Name" />
            <RHFTextField name="phoneNumber" label="Phone Number" />
            <RHFAutocomplete
              name="guardianType"
              type="guardianType"
              label="Guardian Type"
              placeholder="Choose a guardian type"
              options={guardianTypes}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

GuardianAddForm.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  open: PropTypes.bool,
};
