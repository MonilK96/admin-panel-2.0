import PropTypes from 'prop-types';

import {
  Box,
  Button,
  MenuItem,
  TableRow,
  Checkbox,
  TableCell,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function InquiryTableRow({
  row,
  index,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}) {
  const { firstName, lastName, email, contact, dob } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box onClick={onViewRow}>{index + 1}</Box>
      </TableCell>

      <TableCell>{firstName + ' ' + lastName}</TableCell>

      <TableCell>{fDate(dob)}</TableCell>

      <TableCell align="center"> {contact} </TableCell>

      <TableCell align="center"> {email} </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
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
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure you want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

InquiryTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onViewRow: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};
