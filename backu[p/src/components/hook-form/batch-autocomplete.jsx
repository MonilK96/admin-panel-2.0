import React from 'react';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const RHFAutocomplete1 = ({ control, studentName }) => (
  <Controller
    name="batch_members"
    control={control}
    render={({ field }) => (
      <Autocomplete
        {...field}
        multiple
        options={studentName}
        getOptionLabel={(option) => option.name}
        value={field.value || []}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        onChange={(event, newValue) => field.onChange(newValue)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option?._id}
              label={option?.name}
              size="small"
              color="info"
              variant="soft"
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Batch Members" placeholder="Batch Members" />
        )}
      />
    )}
  />
);

export default RHFAutocomplete1;
