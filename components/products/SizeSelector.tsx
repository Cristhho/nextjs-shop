import { FC } from 'react';
import { Box, Button } from '@mui/material';

import { ISize } from '../../interfaces';

type SizeSelectorProps = {
  selectedSize?: ISize,
  sizes: ISize[]
}

export const SizeSelector: FC<SizeSelectorProps> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {
        sizes.map((size) => (
          <Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'}>
            {size}
          </Button>
        ))
      }
    </Box>
  )
}
