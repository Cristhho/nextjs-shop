import { NextPage } from 'next';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';

const AddressPage: NextPage = () => {
  return (
    <ShopLayout
      title='Dirección'
      pageDescription='Confirmar dirección de destino'
    >
      <Typography variant='h1' component='h1'>Dirección</Typography>
      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid item xs={12} sm={6}>
          <TextField label='nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='dirección 2 (opcional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='código postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Pais</InputLabel>
            <Select
              variant='filled'
              label='pais'
              value={1}
            >
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Ecuador</MenuItem>
              <MenuItem value={3}>Mexico</MenuItem>
              <MenuItem value={4}>Peru</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='teléfono' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{mt: 5}} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>Revisar pedido</Button>
      </Box>
    </ShopLayout>
  );
}

export default AddressPage;