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
            <Typography variant="body2">{category.name}</Typography>
          </FlexBox>
        </FixedCell>
        {category?.total?.map((item: Total) => (
          <StyledCell key={item.date} align="right">
            <Typography variant="body2">{item.balance}</Typography>
          </StyledCell>
        ))}
      </MuiTableRow>

      {expandSubjects &&
        category.subjects.map((subject) => (
          <Fade in={expandSubjects}>
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
                  <Typography variant="body2">{month.total}</Typography>
                </StyledCell>
              ))}
            </MuiTableRow>
          </Fade>
        ))}
    </>
  );
};

export const Table = ({ categories }: TableProps) => {
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
                <Typography variant="body2">
                  <strong>{dayjs(item.date).format('MMM YYYY')}</strong>
                </Typography>
              </StyledCell>
            ))}
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow category={category} />
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
