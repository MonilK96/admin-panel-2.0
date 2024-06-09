import * as Yup from 'yup';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';

// ----------------------------------------------------------------------

export default function StudentAccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useMockedUser();

  const GenderType = ['Male', 'Female', 'Other'];
  const courseType = [
    'flutter development',
    'android development',
    'game development',
    'full stack development',
    'web development',
    'node js',
    'react js',
  ];

  const UpdateUserSchema = Yup.object().shape({
    photoURL: Yup.mixed().nullable().required('Avatar is required'),
    firstName: Yup.string().required('firstName is required'),
    LastName: Yup.string().required('lastName is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    contact: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().required('Date is required'),
    eduction: Yup.string().required('eduction is required'),
    school: Yup.string().required('school is required'),
    course: Yup.string().required('Course is required'),
    joinDate: Yup.string().required('Join date is required'),
    Bloodgroup: Yup.string().required('Bloodgroup is required'),
    enrollmentNo: Yup.string().required('enrollmentNo is required'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string().required('Address 2  is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    // about: Yup.string().required('About is required'),
    // not required
    // isPublic: Yup.boolean(),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    dob: moment().format('DD/MM/YYYY'),
    // about: user?.about || '',
    // isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                ></Typography>
              }
            />
            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete User
            </Button>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="contact" label="Phone Number" />
              <RHFAutocomplete
                name="gender"
                type="gender"
                label="gender"
                placeholder="Choose a gender"
                options={GenderType}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="dob"
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? moment(field.value).toDate() : null}
                      onChange={(newDate) => {
                        const formattedDate = newDate ? moment(newDate).format('DD/MM/YYYY') : null;
                        setValue('dob', formattedDate);
                        field.onChange(formattedDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="eduction" label="Eduction" />
              <RHFTextField name="school" label="School / collage" />
              <RHFAutocomplete
                name="course"
                type="course"
                label="course"
                placeholder="Choose a course"
                options={courseType}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="joinDate"
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? moment(field.value).toDate() : null}
                      onChange={(newDate) => {
                        const formattedDate = newDate ? moment(newDate).format('DD/MM/YYYY') : null;
                        setValue('joinDate', formattedDate);
                        field.onChange(formattedDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="Bloodgroup" label="Bloodgroup" />
              <RHFTextField name="enrollmentNo" label="enrollmentNo" />
              <RHFTextField name="address1" label="Address 1" />
              <RHFTextField name="address2" label="Address 2" />
              <RHFAutocomplete
                name="country"
                type="country"
                label="Country"
                placeholder="Choose a country"
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
