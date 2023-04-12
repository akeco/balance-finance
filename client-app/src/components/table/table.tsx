import { Category, Month, Total } from '@/types';
import { Table as MuiTable, TableBody, TableContainer, TableHead, TableRow as MuiTableRow, Paper, IconButton, Fade, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { FixedCell, FlexBox, StyledCell } from './styled-components';
import { SelectedField } from '@/App';
import { Droppable } from 'react-beautiful-dnd';
import { addZeroes } from '@/utils/addZeros';

type CommonProps = {
  selectedField: SelectedField | undefined;
  onSelectField: Dispatch<SetStateAction<SelectedField | undefined>>;
};

type TableProps = {
  categories: Category[];
  grossProfit: Total[];
  netIncome: Total[];
} & CommonProps;

type TableRowProps = {
  category: Category;
} & CommonProps;

const TableRow = ({ category, selectedField, onSelectField }: TableRowProps) => {
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
            {addZeroes(item.balance)}
          </StyledCell>
        ))}
      </MuiTableRow>

      {expandSubjects &&
        category.subjects.map((subject) => (
          <Fade key={subject.id} in={expandSubjects}>
            <MuiTableRow key={subject.id}>
              <Droppable droppableId={subject.id}>
                {(provided) => (
                  <FixedCell ref={provided.innerRef} {...provided.droppableProps}>
                    <Typography
                      variant="body2"
                      sx={{
                        paddingLeft: '48px',
                      }}
                    >
                      {subject.name}
                      {provided.placeholder}
                    </Typography>
                  </FixedCell>
                )}
              </Droppable>
              {subject?.months?.map((month) => (
                <StyledCell
                  key={month.id}
                  cursor={!!month.total ? 'pointer' : undefined}
                  selected={
                    selectedField?.monthId === month.id && selectedField?.subjectId === subject.id && selectedField?.categoryId === category.id
                  }
                  align="right"
                  onClick={() => !!month.total && onSelectField({ monthId: month.id, subjectId: subject.id, categoryId: category.id })}
                >
                  {addZeroes(month.total!)}
                </StyledCell>
              ))}
            </MuiTableRow>
          </Fade>
        ))}
    </>
  );
};

export const Table = ({ categories, grossProfit, netIncome, selectedField, onSelectField }: TableProps) => {
  const renderTotalRow = (label: string, values: Total[]) => {
    return (
      <MuiTableRow>
        <FixedCell background="darken" sx={{ paddingLeft: 3.5 }}>
          {label}
        </FixedCell>
        {values.map((item) => (
          <StyledCell background="darken" key={item.date} align="right">
            {addZeroes(item.balance)}
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
            <TableRow key={category.id} category={category} selectedField={selectedField} onSelectField={onSelectField} />
          ))}
          {grossProfit?.length > 0 && renderTotalRow('Gross Profit', grossProfit)}
          {categories.slice(3).map((category) => (
            <TableRow key={category.id} category={category} selectedField={selectedField} onSelectField={onSelectField} />
          ))}
          {netIncome?.length > 0 && renderTotalRow('Net Income', netIncome)}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
