import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ComplainNewForm({ currentJob }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    remark: Yup.string().required('Remark is required'),
    complain: Yup.string().required('Complain is required'),
    complainDate: Yup.mixed().nullable().required('Complain date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      remark: '',
      complain: '',
      complainDate: null, 
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    enqueueSnackbar('Form submitted successfully', { variant: 'success' });
    reset(defaultValues);
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4} display='flex' alignItems='center'>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Complain & Remarks
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Complain Date</Typography>
                <Controller
                  name="complainDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Complain</Typography>
                <RHFTextField name="complain" placeholder="Complain..." />
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Remark</Typography>
                <RHFTextField name="remark" placeholder="Remark" />
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentJob ? 'Create Job' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

ComplainNewForm.propTypes = {
  currentJob: PropTypes.object,
};
