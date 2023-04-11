import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Transaction } from '@/types';
import { Main, DrawerHeader } from '@/components/sidebar/styled-components';
import dayjs from 'dayjs';

const drawerWidth = 250;

type SidebarProps = {
  open: boolean;
  transactions: Transaction[];
  children: React.ReactNode;
  onClose(): void;
};

export const Sidebar = ({ open, transactions, children, onClose }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Main open={open}>{children}</Main>
      <Drawer
        sx={{
          zIndex: !open ? -999 : 1,
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={onClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {transactions.map((item) => (
            <>
              <ListItem key={item.id} disablePadding>
                <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                  <ListItemText secondary={dayjs(item.createdAt).format('MM/DD/YYYY')} />
                  <Typography sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} variant="body2">
                    <span>{item.company}</span> <span>${item.balance}</span>
                  </Typography>
                  <ListItemText secondary={item.description} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
