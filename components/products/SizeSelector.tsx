import { FC } from 'react';
import { Box, Button } from '@mui/material';

import { ISize } from '../../interfaces';

type SizeSelectorProps = {
  selectedSize?: ISize,
  sizes: ISize[],
  onSelectedSize: (size: ISize) => void
}

export const SizeSelector: FC<SizeSelectorProps> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {
        sizes.map((size) => (
          <Button
            key={size}
            size='small'
            color={selectedSize === size ? 'primary' : 'info'}
            onClick={() => onSelectedSize(size)}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  )
}
