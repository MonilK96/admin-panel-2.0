import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { ROLE, EMPLOYEE_GENDER } from 'src/_mock/_employee';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import countrystatecity from '../../_mock/map/csc.json';

// ----------------------------------------------------------------------

export default function EmployeeNewEditForm({ employeeId }) {
  const [profilePic, setProfilePic] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');

  const NewEMployeeSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    contact: Yup.string().required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().required('Date of birth is required'),
    experience: Yup.string().required('Experience is required'),
    role: Yup.string().required('Role is required'),
    technology: Yup.string().required('Technology is required'),
    joining_date: Yup.date().required('Joining date is required'),
    qualification: Yup.string().required('Qualification is required'),
    address_1: Yup.string().required('Address is required'),
    address_2: Yup.string().optional(),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.string().required('Zip code is required'),
    avatar_url: Yup.mixed().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(NewEMployeeSchema),
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
      experience: '',
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
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchInquiryById = async () => {
      try {
        if (employeeId) {
          const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/${employeeId}/employee`;
          const response = await axios.get(URL);
          const { data } = response.data;
          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            contact: data.contact,
            dob: data.dob ? new Date(data.dob) : null,
            joining_date: data.joining_date ? new Date(data.joining_date) : null,
            qualification: data.qualification,
            experience: data.experience,
            gender: data.gender,
            technology: data.technology,
            email: data.email,
            education: data.education,
            role: data.role,
            address_1: data.address.address_1,
            address_2: data.address.address_2,
            country: data.address.country,
            state: data.address.state,
            city: data.address.city,
            zipcode: data.address.zipcode,
            avatar_url: data.avatar_url,
          });
          setProfilePic(data.avatar_url);
        }
      } catch (error) {
        console.error('Failed to fetch inquiry:', error);
      }
    };

    fetchInquiryById();
  }, [employeeId, reset]);

  // Add inquiry
  const createEmployee = async (newEmployee) => {
    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/employee`;
    const response = await axios.post(URL, newEmployee);
    return response.data;
  };

  // Update Employee
  async function UpdateEmployee(id, data) {
    try {
      const apiEndpoint = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/${employeeId}/updateEmployee`;
      const response = await axios.put(apiEndpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error updating inquiry:', error.message);
      throw error;
    }
  }

  const onSubmit = async (data) => {
    try {
      let response;
      if (employeeId) {
        response = await UpdateEmployee(employeeId, data);
      } else {
        response = await createEmployee(data);
      }
      reset();
      router.push(paths.dashboard.employee.list);
      enqueueSnackbar(employeeId ? response.message : response.message, {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  // Upload Employee Image
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/${employeeId}/employee/profile-pic`;
    const formData = new FormData();
    formData.append('profile-pic', file);

    axios
      .put(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const uploadedImageUrl = response.data.avatar_url;
        setProfilePic(uploadedImageUrl);
      })
      .catch((error) => {
        console.error('Upload error:', error);
      });
  };

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Personal Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Basic info, profile pic, role, qualification...
          </Typography>

          <Card sx={{ pt: 5, px: 3, mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <Controller
                name="avatar_url"
                control={control}
                render={({ field }) => (
                  <RHFUploadAvatar
                    name="avatar_url"
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
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                      </Typography>
                    }
                  />
                )}
              />
            </Box>
          </Card>
        </Grid>
      )}

      <Grid xs={12} md={8}>
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
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Address info, country, state, city...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
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
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', justifyContent: 'end' }}>
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
