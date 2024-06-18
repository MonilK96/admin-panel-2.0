import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Card, MenuItem } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';

export default function ExpenseCreatePage() {
  const [inputVal, setInputVal] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Utilities' },
    { id: 3, name: 'Rentsd' },
    { id: 4, name: 'dddde' },
    { id: 5, name: 'rrr' },
    { id: 6, name: 'juku' },
    { id: 7, name: 'wee' },
    { id: 8, name: 'sss' },
    { id: 9, name: 'fr' },
    { id: 10, name: 'hh' },
  ]);

  const handleAddExpense = () => {
    if (inputVal.trim() !== '') {
      const newExpense = { id: expenses.length + 1, name: inputVal };
      setExpenses([...expenses, newExpense]);
      setInputVal('');
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          marginBottom: '10px',
          padding: '10px',
        }}
      >
        <Grid container item  spacing={2} sx={{alignItems:'center'}}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) => setInputVal(e.target.value)}
              label="Expenses"
              value={inputVal}
              sx={{ fontSize: '16px' }}
            />
          </Grid>
          <Grid item sxs={4}>
            <Button
              sx={{ fontSize: '15px',p:1 }}
              variant="outlined"
              color="primary"
              width="100%"
              onClick={handleAddExpense}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                columnGap={2}
                rowGap={2}
                display="grid"
                Height='600px'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
                {expenses.map((expense) => (
                  <Grid
                    container
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      boxShadow: 2,
                      borderRadius:2,
                      p:1,
                      m: 1,
                    }}
                    key={expense.id}
                  >
                    <Grid item>
                      <Typography>{expense.name}</Typography>
                    </Grid>
                    <Grid item>
                      <MenuItem
                        sx={{ color: 'error.main' }}
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </MenuItem>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
