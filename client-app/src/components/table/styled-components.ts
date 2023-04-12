import { styled } from '@mui/material/styles';
import { TableCell, Box, TableCellProps } from '@mui/material';

interface StyledCellProps extends TableCellProps {
  background?: 'darken';
  cursor?: 'pointer';
  selected?: boolean;
}

export const StyledCell = styled(TableCell)<StyledCellProps>(({ theme, background, cursor, selected }) => ({
  backgroundColor: background === 'darken' ? theme.palette.action.focus : theme.palette.action.hover,
  cursor: cursor || 'default',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '',
}));

export const FixedCell = styled(TableCell)<StyledCellProps>(({ theme, background }) => ({
  minWidth: 250,
  maxWidth: 250,
  backgroundColor: background === 'darken' ? theme.palette.action.focus : '',
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
