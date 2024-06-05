import { useEffect, useState } from 'react'; // Added useState
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete, CardHeader, TextField, Typography } from '@mui/material'; // Added Button
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFMultiSelect,
  RHFRadioGroup,
  RHFTextField,
} from 'src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { paths } from 'src/routes/paths';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hooks';
import {
  INQUIRY_INTERESTED_IN,
  INQUIRY_REFERENCE_BY,
  INQUIRY_SUGGESTED_IN,
} from 'src/_mock/_inquiry';
import { Box } from '@mui/system';
import countrystatecity from '../../_mock/map/csc.json';

export default function InquiryNewEditForm({ inquiryId }) {
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    contact: Yup.string().required('Phone number is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      contact: '',
      dob: null,
      occupation: '',
      email: '',
      education: '',
      address_line1: '',
      address_line2: '',
      country: '',
      state: '',
      city: '',
      zip_code: '',
      fatherName: '',
      father_contact: '',
      father_occupation: '',
      reference_by: '',
      interested_in: [],
      suggested_by: '',
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchInquiryById = async () => {
      try {
        if (inquiryId) {
          const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/${inquiryId}/inquiry`;
          const response = await axios.get(URL);
          const { data } = response;
          reset({
            firstName: data.data.inquiry.firstName,
            lastName: data.data.inquiry.lastName,
            contact: data.data.inquiry.contact,
            dob: data.data.inquiry.dob ? new Date(data.data.inquiry.dob) : null,
            occupation: data.data.inquiry.occupation,
            email: data.data.inquiry.email,
            education: data.data.inquiry.education,
            address_line1: data.data.inquiry.address.address_line1,
            address_line2: data.data.inquiry.address.address_line2,
            country: data.data.inquiry.address.country,
            state: data.data.inquiry.address.state,
            city: data.data.inquiry.address.city,
            zip_code: data.data.inquiry.address.zip_code,
            fatherName: data.data.inquiry.fatherName,
            father_contact: data.data.inquiry.father_contact,
            father_occupation: data.data.inquiry.father_occupation,
            reference_by: data.data.inquiry.reference_by,
            interested_in: data.data.inquiry.interested_in,
            suggested_by: data.data.inquiry.suggested_by,
          });
        }
      } catch (error) {
        console.error('Failed to fetch inquiry:', error);
      }
    };

    fetchInquiryById();
  }, [inquiryId, reset]);

  const postInquiry = async (newInquiry) => {
    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/inquiry`;
    const response = await axios.post(URL, newInquiry);
    return response.data;
  };

  async function updateInquiry(id, data) {
    try {
      const apiEndpoint = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/${id}/updateInquiry`;
      const response = await axios.put(apiEndpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error updating inquiry:', error.message);
      throw error;
    }
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
      let response;
      if (inquiryId) {
        response = await updateInquiry(inquiryId, data);
      } else {
        response = await postInquiry(data);
      }
      enqueueSnackbar(inquiryId ? response.data.message : response.message, { variant: 'success' });
      router.push(paths.dashboard.inquiry.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  });

  const personalDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Personal Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Basic info, role, Occupation...
          </Typography>
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
              <RHFTextField name="occupation" label="Occupation" />
              <RHFTextField name="education" label="Education" />
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
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const addressDetails = (
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
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="address_line1" label="Address 1" />
              <RHFTextField name="address_line2" label="Address 2" />
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
              <RHFTextField name="zip_code" label="Zip Code" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const fatherDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Father Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Faher info, Contact, Occupation...
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Father Details" />}
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
              <RHFTextField name="fatherName" label="Father Name" />
              <RHFTextField name="father_contact" label="Father Phone Number" />
              <RHFTextField name="father_occupation" label="Father Occupation" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const otherDetails = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Other Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            How did you come,Suggested By ,Interested in...
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Other Details" />}
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
              <Stack spacing={1}>
                <Typography variant="subtitle2">How did you come to know about JBS IT?</Typography>
                <RHFRadioGroup row spacing={4} name="reference_by" options={INQUIRY_REFERENCE_BY} />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Why did you choose this Course?</Typography>
                <RHFRadioGroup row spacing={4} name="suggested_by" options={INQUIRY_SUGGESTED_IN} />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Select Interested Options:</Typography>
                <RHFMultiSelect
                  checkbox
                  name="interested_in"
                  label="Interested In"
                  options={INQUIRY_INTERESTED_IN}
                />
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid item md={4} />}
      <Grid
        item
        xs={12}
        md={8}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
      >
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!inquiryId ? 'Create Inquiry' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} />
        {personalDetails}
        <Grid item xs={12} md={12} />
        {addressDetails}
        <Grid item xs={12} md={12} />
        {fatherDetails}
        <Grid item xs={12} md={12} />
        {otherDetails}
        <Grid item xs={12} md={12} />
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

InquiryNewEditForm.propTypes = {
  inquiryId: PropTypes.string,
};
