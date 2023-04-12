import { useEffect, useState } from 'react';
import { Table } from '@/components/table/table';
import { CircularProgress } from '@mui/material';
import { CategoriesFinancesResult, useGetCategoriesAndFinances } from '@/queries/useGetCategoriesAndFinances';
import { TransactionsResult, useGetTransactions } from '@/queries/useGetTransactions';
import { CenteredBox } from '@/styles/styled-components';
import { Sidebar } from '@/components/sidebar/sidebar';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TransactionMutation, useUpdateTransaction } from '@/mutations/useUpdateTransaction';
import { Category } from '@/types';

export type SelectedField = { monthId: string; subjectId: string; categoryId: string };

const App = () => {
  const [selectedField, setSelectedField] = useState<SelectedField>();
  const { loading, categories, grossProfit, netIncome }: CategoriesFinancesResult = useGetCategoriesAndFinances();
  const [updateTransaction]: TransactionMutation = useUpdateTransaction();
  const [getTransactions, { transactions, removeTransaction }]: TransactionsResult = useGetTransactions(selectedField);

  useEffect(() => {
    if (selectedField) {
      getTransactions();
    }
  }, [selectedField, getTransactions]);

  const onCloseSidebar = () => setSelectedField(undefined);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const category: Category = categories.filter((category) =>
      category.subjects.find((subject) => subject.id === result.destination!.droppableId),
    )[0];
    updateTransaction({
      variables: {
        categoryId: category!.id,
        monthId: selectedField!.monthId,
        subjectId: result.destination.droppableId,
        transactionId: result.draggableId,
      },
    });
    removeTransaction(result.draggableId);
  };

  if (loading)
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Sidebar open={!!selectedField} transactions={transactions} onClose={onCloseSidebar}>
        <Table
          categories={categories}
          grossProfit={grossProfit}
          netIncome={netIncome}
          selectedField={selectedField}
          onSelectField={setSelectedField}
        />
      </Sidebar>
    </DragDropContext>
  );
};

export default App;
