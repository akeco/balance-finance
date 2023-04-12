import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CssBaseline, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Transaction } from '@/types';
import { Main, DrawerHeader, DrawerStyled } from '@/components/sidebar/styled-components';
import dayjs from 'dayjs';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { addZeroes } from '@/utils/addZeros';

type SidebarProps = {
  open: boolean;
  transactions: Transaction[];
  children: React.ReactNode;
  onClose(): void;
};

type DraggableListItemProps = {
  transaction: Transaction;
  index: number;
};

const DraggableListItem = ({ transaction, index }: DraggableListItemProps) => {
  return (
    <React.Fragment key={transaction.id}>
      <Draggable draggableId={transaction.id} index={index}>
        {(provided) => (
          <ListItem key={transaction.id} disablePadding {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <ListItemText secondary={dayjs(transaction.createdAt).format('MM/DD/YYYY')} />
              <Typography sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} variant="body2">
                <span>{transaction.company}</span> <span>${addZeroes(transaction.balance)}</span>
              </Typography>
              <ListItemText secondary={transaction.description} />
            </ListItemButton>
          </ListItem>
        )}
      </Draggable>
      <Divider />
    </React.Fragment>
  );
};

export const Sidebar = ({ open, transactions, children, onClose }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Main open={open}>{children}</Main>
      <DrawerStyled open={open} variant="persistent" anchor="right">
        <DrawerHeader>
          <IconButton onClick={onClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <Droppable droppableId="list" isDropDisabled>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {transactions.length > 0 ? (
                transactions.map((item, index) => <DraggableListItem key={item.id} transaction={item} index={index} />)
              ) : (
                <ListItem>No more transactions</ListItem>
              )}
            </List>
          )}
        </Droppable>
      </DrawerStyled>
    </Box>
  );
};
