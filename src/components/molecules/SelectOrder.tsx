import Box from '@mui/material/Box';
import { memo, useState, VFC } from 'react';

export const SelectOrder: VFC = memo(() => {
  const [order, setOrder] = useState<number>(0);
  const [hoverOrder, setHoverOrder] = useState<number | null>(null);

  const selectOrder = (value: number) => {
    setOrder(value);
  };

  const orderMove = (value: number) => {
    setHoverOrder(value);
  };

  const orderLeave = () => {
    setHoverOrder(null);
  };

  return (
    <Box mb={1} display="flex">
      <Box sx={{ flexGrow: 1 }} color="#9e9e9e" fontSize={13}>
        20 / 200
      </Box>
      <Box ml={5} sx={{ flexGrow: 0.1 }} color="#9e9e9e" fontSize={13}>
        並び順
      </Box>
      <Box
        onMouseMove={() => orderMove(0)}
        onMouseLeave={orderLeave}
        color={order === 0 || hoverOrder === 0 ? '#009688' : ''}
        fontWeight={order === 0 ? 'bold' : ''}
        sx={{ cursor: 'pointer' }}
        mr={1.2}
        fontSize={13}
        onClick={() => selectOrder(0)}
      >
        おすすめ
      </Box>
      <Box
        onMouseMove={() => orderMove(1)}
        onMouseLeave={orderLeave}
        color={order === 1 || hoverOrder === 1 ? '#009688' : ''}
        fontWeight={order === 1 ? 'bold' : ''}
        sx={{ cursor: 'pointer' }}
        mr={1.2}
        fontSize={13}
        onClick={() => selectOrder(1)}
      >
        新着
      </Box>
      <Box
        onMouseMove={() => orderMove(2)}
        onMouseLeave={orderLeave}
        color={order === 2 || hoverOrder === 2 ? '#009688' : ''}
        fontWeight={order === 2 ? 'bold' : ''}
        sx={{ cursor: 'pointer' }}
        mr={1.2}
        fontSize={13}
        onClick={() => selectOrder(2)}
      >
        開催日
      </Box>
    </Box>
  );
});
