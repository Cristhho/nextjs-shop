import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material';

type ItemCounterProps = {

}

export const ItemCounter: FC<ItemCounterProps> = () => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutlined />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton>
        <AddCircleOutlined />
      </IconButton>
    </Box>
  )
}
