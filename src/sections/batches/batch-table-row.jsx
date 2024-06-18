import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { TableHeadCustom } from 'src/components/table';
import { useAuthContext } from 'src/auth/hooks';
import { Table } from '@mui/material';

// ----------------------------------------------------------------------

export default function BatchTableRow({
  row,
  selected,
  onEditRow,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  index,
}) {
  const { user } = useAuthContext();
  const { technology, batch_name, batch_time, batch_members, faculty } = row;

  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox" sx={{ width: '100px' }}>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {index + 1}
        </Box>
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={faculty?.avatar_url} src={faculty?.avatar_url} sx={{ mr: 2 }} />

        <ListItemText
          primary={`${faculty?.firstName} ${faculty?.lastName}`}
          secondary={faculty?.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell> {batch_name} </TableCell>
      <TableCell> {technology} </TableCell>

      <TableCell>
        <ListItemText
          // primary={fDate(createdAt)}
          primary={fTime(batch_time)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const TABLE_HEAD = [
    { id: 'student', label: 'Students',width:1000 },
    { id: 'enroll_no', label: 'Enroll No', width: 280 },
    { id: ' contact', label: ' Contact', width: 330 },
    { id: 'course', label: 'Course', width: 220 },
    // { id: 'totalAmount', label: 'Price', width: 140 },
    // { id: 'status', label: 'Status', width: 110 },
    { id: '', width: 88 },
  ];
  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Table sx={{width:"100%",display:"unset"}}>
            <TableHeadCustom  headLabel={TABLE_HEAD} />
            <Stack component={Paper} > 
              {batch_members?.map((item) => (
                <Stack
                  key={item._id}
                  direction="row"
                  alignItems="center"
                  sx={{
                    p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                    '&:not(:last-of-type)': {
                      borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                    },
                    pl: 3,
                  }}
                >
                  <Avatar
                    src={item?.profile_pic}
                    variant="rounded"
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />

                  <ListItemText
                    primary={`${item?.firstName} ${item?.lastName}`}
                    secondary={item?.email}
                    primaryTypographyProps={{
                      typography: 'body2',
                    }}
                    secondaryTypographyProps={{
                      component: 'span',
                      color: 'text.disabled',
                      mt: 0.5,
                    }}
                    sx={{width:680}}
                  />

                  <Box sx={{width:"200px"} }>{item?.enrollment_no}</Box>
                  <Box sx={{width:"200px"}}>{item?.contact}</Box>
                  <Box sx={{width:"300px"}}>{item?.course}</Box>

                  {/* <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.price)}</Box> */}
                </Stack>
              ))}
            </Stack>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

BatchTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};
