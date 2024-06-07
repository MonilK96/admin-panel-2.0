import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function GuardianItem({ address, action, sx, ...other }) {
  const { name, fullAddress, addressType, phoneNumber, primary } = address;

  return (
    <Stack
      component={Paper}
      spacing={2}
      alignItems={{ md: 'flex-end' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2">
            {'ramu kaka'}
            <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
              ({'papa na friend'})
            </Box>
          </Typography>
        </Stack>

        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fullAddress}
        </Typography> */}

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {'7845120369'}
        </Typography>
      </Stack>

      {action && action}
    </Stack>
  );
}

GuardianItem.propTypes = {
  action: PropTypes.node,
  address: PropTypes.object,
  sx: PropTypes.object,
};
