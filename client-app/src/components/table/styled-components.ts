import { styled } from '@mui/material/styles';
import { TableCell, Box } from '@mui/material';

export const StyledCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

export const FixedCell = styled(TableCell)(() => ({
  width: 250,
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
