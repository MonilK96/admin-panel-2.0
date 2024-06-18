import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import {
  Autocomplete,
  TextField,
  Box,
  Card,
  CardHeader,
  Typography,
  Stack,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useResponsive } from 'src/hooks/use-responsive';
import { EMPLOYEE_GENDER, ROLE } from 'src/_mock/_employee';
import FormProvider, {
  RHFUploadAvatar,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import countrystatecity from '../../_mock/map/csc.json';

export default function EmployeeNewEditForm({ employeeId }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [profilePic, setProfilePic] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const mdUp = useResponsive('up', 'md');

  const NewEmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    contact: Yup.string().required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().required('Date of birth is required'),
    experience: Yup.number()
      .required('Experience is required')
      .min(0, 'Experience must be a positive number'),
    role: Yup.string().required('Role is required'),
    technology: Yup.string().required('Technology is required'),
    joining_date: Yup.date().required('Joining date is required'),
    qualification: Yup.string().required('Qualification is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      contact: '',
      dob: null,
      email: '',
      gender: '',
      role: '',
      qualification: '',
      technology: '',
      experience: 0,
      joining_date: null,
      address_1: '',
      address_2: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      avatar_url: null,
    },
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        if (employeeId) {
          const URL = `${import.meta.env.VITE_AUTH_API}/api/company/employee/${employeeId}`;
          const response = await axios.get(URL);
          const { data } = response.data;
          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            contact: data.contact,
            dob: data.dob ? new Date(data.dob) : null,
            email: data.email,
            gender: data.gender,
            role: data.role,
            qualification: data.qualification,
            technology: data.technology,
            experience: data.experience,
            joining_date: data.joining_date ? new Date(data.joining_date) : null,
            address_1: data.address_detail?.address_1 || '',
            address_2: data.address_detail?.address_2 || '',
            country: data.address_detail?.country || '',
            state: data.address_detail?.state || '',
            city: data.address_detail?.city || '',
            zipcode: data.address_detail?.zipcode || '',
            avatar_url: data.avatar_url || '',
          });
          setProfilePic(data.avatar_url);
        }
      } catch (error) {
        console.error('Failed to fetch employee:', error);
      }
    };

    fetchEmployeeById();
  }, [employeeId, reset]);

  const createEmployee = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/employee`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Creation failed. Please try again.');
    }
  };

  const updateEmployee = async (id, formData) => {
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/employee/${employeeId}`;
      const response = await axios.put(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    const addemployee = {
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      dob: data.dob,
      email: data.email,
      gender: data.gender,
      role: data.role,
      qualification: data.qualification,
      technology: data.technology,
      experience: Number(data.experience),
      joining_date: data.joining_date,
      address_1: data.address_1,
      address_2: data.address_2,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
    };

    const formData = new FormData();
    Object.keys(addemployee).forEach((key) => {
      formData.append(key, addemployee[key]);
    });

    if (profilePic) {
      formData.append('profile-pic', profilePic);
    }

    let formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      let response;
      if (employeeId) {
        response = await updateEmployee(employeeId, formData);
        router.push(paths.dashboard.employee.list);
      } else {
        response = await createEmployee(formData);
        router.push(paths.dashboard.employee.list);

      }
      enqueueSnackbar(response.message, {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.message || 'Error occurred', {
        variant: 'error',
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setProfilePic(file);
        setValue('avatar_url', file);
      }
    },
    [setValue]
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Personal Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Basic info, profile pic, role, qualification...
          </Typography>

          <Card sx={{ pt: 5, px: 3, mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar name="profile-pic" onDrop={handleDrop} />
            </Box>
          </Card>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Personal Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
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
                fullWidth
                options={EMPLOYEE_GENDER.map((option) => option)}
                getOptionLabel={(option) => option}
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

              <RHFAutocomplete
                name="role"
                type="role"
                label="Role"
                placeholder="Choose a role"
                fullWidth
                options={ROLE.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="experience"
                label="Experience"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField name="qualification" label="Qualification" />
              <RHFTextField name="technology" label="Technology" />

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
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderAddress = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Address info, country, state, city...
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Address Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="address_1" label="Address line 1" />
            <RHFTextField name="address_2" label="Address line 2" />

            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={countrystatecity.map((country) => country.name)}
                    onChange={(event, value) => field.onChange(value)}
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
                    renderInput={(params) => (
                      <TextField {...params} label="City" variant="outlined" />
                    )}
                  />
                )}
              />
              <RHFTextField name="zipcode" label="Zip code" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid item md={4} />}
      <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'end' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!employeeId ? 'Add Employee' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {renderProperties}
        {renderAddress}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

EmployeeNewEditForm.propTypes = {
  employeeId: PropTypes.string,
};
