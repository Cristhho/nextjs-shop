import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material';

type ItemCounterProps = {
  quantity: number,
  disabled?: boolean,
  onUpdateQuantity: (adding: boolean) => void,
}

export const ItemCounter: FC<ItemCounterProps> = ({ quantity, disabled, onUpdateQuantity }) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => onUpdateQuantity(false)} disabled={disabled}>
        <RemoveCircleOutlined />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{`${quantity}`}</Typography>
      <IconButton onClick={() => onUpdateQuantity(true)} disabled={disabled}>
        <AddCircleOutlined />
      </IconButton>
    </Box>
  )
}
