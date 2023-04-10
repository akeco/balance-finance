import { styled } from '@mui/material/styles';
import { TableCell, Box, TableCellProps } from '@mui/material';

interface StyledCellProps extends TableCellProps {
  active?: 'true';
}

export const StyledCell = styled(TableCell)<StyledCellProps>(({ theme, active }) => ({
  backgroundColor: active === 'true' ? theme.palette.action.focus : theme.palette.action.hover,
}));

export const FixedCell = styled(TableCell)<StyledCellProps>(({ theme, active }) => ({
  width: 250,
  backgroundColor: active === 'true' ? theme.palette.action.focus : '',
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
