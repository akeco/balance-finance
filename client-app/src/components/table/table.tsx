import { Category, Month, Total } from '@/types';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  Paper,
  IconButton,
  Fade,
  Typography,
  Box,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FixedCell, FlexBox, StyledCell } from './styled-components';

type TableProps = {
  categories: Category[];
  grossProfit: Total[];
  netIncome: Total[];
};

type TableRowProps = {
  category: Category;
};

const TableRow = ({ category }: TableRowProps) => {
  const [expandSubjects, setExpandSubjects] = useState(false);

  const onExpandToggle = () => setExpandSubjects(!expandSubjects);

  return (
    <>
      <MuiTableRow key={category.id}>
        <FixedCell component="th" scope="row">
          <FlexBox>
            <IconButton onClick={onExpandToggle} size="medium">
              <ExpandMore
                fontSize="small"
                sx={{
                  transform: expandSubjects ? 'rotate(180deg)' : 'auto',
                  transition: '250ms all ease',
                }}
              />
            </IconButton>
            {category.name}
          </FlexBox>
        </FixedCell>
        {category?.total?.map((item: Total) => (
          <StyledCell key={item.date} align="right">
            {item.balance}
          </StyledCell>
        ))}
      </MuiTableRow>

      {expandSubjects &&
        category.subjects.map((subject) => (
          <Fade key={subject.id} in={expandSubjects}>
            <MuiTableRow key={subject.id}>
              <FixedCell>
                <Typography
                  variant="body2"
                  sx={{
                    paddingLeft: '48px',
                  }}
                >
                  {subject.name}
                </Typography>
              </FixedCell>
              {subject?.months?.map((month) => (
                <StyledCell key={month.id} align="right">
                  {month.total}
                </StyledCell>
              ))}
            </MuiTableRow>
          </Fade>
        ))}
    </>
  );
};

export const Table = ({ categories, grossProfit, netIncome }: TableProps) => {
  const renderTotalRow = (label: string, values: Total[]) => {
    return (
      <MuiTableRow>
        <FixedCell active="true" sx={{ paddingLeft: 3.5 }}>
          {label}
        </FixedCell>
        {values.map((item) => (
          <StyledCell active="true" key={item.date} align="right">
            {item.balance}
          </StyledCell>
        ))}
      </MuiTableRow>
    );
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <MuiTableRow>
            <FixedCell>
              <Typography variant="h6">Financial Report</Typography>
            </FixedCell>
            {categories[0]?.subjects[0].months?.map((item: Month) => (
              <StyledCell key={item.id} align="right">
                <strong>{dayjs(item.date).format('MMM YYYY')}</strong>
              </StyledCell>
            ))}
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {categories.slice(0, 3).map((category) => (
            <TableRow key={category.id} category={category} />
          ))}
          {renderTotalRow('Gross Profit', grossProfit)}
          {categories.slice(3).map((category) => (
            <TableRow key={category.id} category={category} />
          ))}
          {renderTotalRow('Net Income', netIncome)}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
