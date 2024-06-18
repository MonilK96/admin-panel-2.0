import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAuthContext } from 'src/auth/hooks';
import dayjs from 'dayjs';

export default function DemoNewEditForm({ open, onClose, currentId }) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');

  const NewUserSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    technology: Yup.string().required('Technology is required'),
    detail: Yup.string().required('Detail is required'),
  });

  useEffect(() => {
    const fetchFacultyId = async () => {
      try {
        const response = await axios.get(
          'https://admin-panel-dmawv.ondigitalocean.app/api/company/employee/6671261c9e31d0fb839aa9f7'
        );
        setFacultyId(response.data.data._id);
        setFacultyName(response.data.data.firstName + ' ' + response.data.data.lastName);
      } catch (error) {
        console.error('Error fetching faculty ID:', error);
      }
    };

    fetchFacultyId();
  }, []);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      inquiry_id: currentId,
      company_id: user.company_id,
      faculty_id: facultyId,
      date: null,
      technology: '',
      detail: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const createDemo = async (payload) => {
    console.log(payload);
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/v2/demo`;
      const response = await axios.post(URL, payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error creating demo:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        inquiry_id: currentId._id,
        company_id: user.company_id,
        detail: data.detail,
        technology: data.technology,
        date: dayjs(data.date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        faculty_id: facultyId,
      };
      const response = await createDemo(payload);
      enqueueSnackbar(response.message, {
        variant: 'success',
      });
      onClose();
    } catch (error) {
      console.error('Error submitting demo:', error);
      enqueueSnackbar('Failed to create demo', {
        variant: 'error',
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 420 },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>Demo Add</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ p: 2 }}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(1, 1fr)',
                }}
              >
                <Controller
                  name="faculty_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Faculty Name"
                      placeholder="Faculty Name"
                      error={!!error}
                      value={facultyName}
                      helperText={error ? error.message : null}
                      fullWidth
                      disabled
                    />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <DatePicker
                        label="Date"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!error}
                            helperText={error ? error.message : null}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
                <Controller
                  name="technology"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Technology"
                      placeholder="Technology"
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="detail"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Detail"
                      placeholder="Detail"
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Add Demo
              </LoadingButton>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

DemoNewEditForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentId: PropTypes.object,
};
