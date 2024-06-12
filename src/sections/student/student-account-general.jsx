import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';
import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from 'notistack'; // Correct import for Snackbar
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { STUDENT_GENDER, courses } from 'src/_mock/_student';
import countrystatecity from '../../_mock/map/csc.json';

export default function StudentAccountGeneral() {
  const { user } = useAuthContext();
  const [profilePic, setProfilePic] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    contact: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().required('Date of Birth is required'),
    joining_date: Yup.date().required('Joining Date is required'),
    education: Yup.string().required('Education is required'),
    school_college: Yup.string().required('School/College is required'),
    course: Yup.string().required('Course is required'),
    blood_group: Yup.string().required('Blood Group is required'),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      profile_pic: null,
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      gender: '',
      course: '',
      education: '',
      school_college: '',
      dob: null,
      joining_date: null,
      enrollment_no: '',
      blood_group: '',
      address_1: '',
      address_2: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      total_amount: '',
      amount_paid: '',
      discount: '',
    },
  });

  const {
    setValue,
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const postStudent = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_AUTH_API}/api/company/${user.company_id}/student`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error('Update failed. Please try again.');
    }
  };

  const onSubmit = async (data) => {
    try {
      await postStudent(data);
      enqueueSnackbar('Update success!', { variant: 'success' });
      reset();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('profile-pic', file);
      const URL = `${import.meta.env.REACT_APP_AUTH_API}/api/company/${user.company_id}/student`;
      axios
        .post(URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const uploadedImageUrl = response.data.profile_pic;
          setProfilePic(uploadedImageUrl);
        })
        .catch((error) => {
          console.error('Upload error:', error);
        });
    },
    [user.company_id]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar name="profile_pic" onDrop={handleDrop} />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
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
                label="Gender"
                placeholder="Choose a gender"
                options={STUDENT_GENDER}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error ? error.message : ''}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="education" label="Education" />
              <RHFTextField name="school_college" label="School/College" />
              <RHFAutocomplete
                name="course"
                type="course"
                label="Course"
                placeholder="Choose a course"
                options={courses.map((course) => course.label)}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="joining_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Joining Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error ? error.message : ''}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="blood_group" label="Blood Group" />
              <RHFTextField name="enrollment_no" label="Enrollment No" />
              <RHFTextField name="address_1" label="Address 1" />
              <RHFTextField name="address_2" label="Address 2" />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={countrystatecity.map((country) => country.name)}
                    onChange={(event, value) => field.onChange(value)}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField {...params} label="Country" variant="outlined" />
                    )}
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={
                      watch('country')
                        ? countrystatecity
                            .find((country) => country.name === watch('country'))
                            ?.states.map((state) => state.name) || []
                        : []
                    }
                    onChange={(event, value) => field.onChange(value)}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField {...params} label="State" variant="outlined" />
                    )}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={
                      watch('state')
                        ? countrystatecity
                            .find((country) => country.name === watch('country'))
                            ?.states.find((state) => state.name === watch('state'))
                            ?.cities.map((city) => city.name) || []
                        : []
                    }
                    onChange={(event, value) => field.onChange(value)}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField {...params} label="City" variant="outlined" />
                    )}
                  />
                )}
              />
              <RHFTextField name="zipcode" label="Zip Code" />
              <RHFTextField name="total_amount" label="Total Amount" />
              <RHFTextField name="amount_paid" label="Amount Paid" />
              <RHFTextField name="discount" label="Discount" />
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
