import { useEffect, useState } from 'react';
import { Table } from '@/components/table/table';
import { CircularProgress } from '@mui/material';
import { useGetCategoriesAndRelated } from '@/queries/useGetCategoriesAndRelated';
import { useGetTransactions } from '@/queries/useGetTransactions';
import { CenteredBox } from '@/styles/styled-components';
import { Sidebar } from './components/sidebar/sidebar';

export type SelectedField = { monthId: string; subjectId: string; categoryId: string };

const App = () => {
  const [selectedField, setSelectedField] = useState<SelectedField>();
  const { loading, categories, grossProfit, netIncome } = useGetCategoriesAndRelated();
  const [getTransactions, { transactions }] = useGetTransactions(selectedField);

  useEffect(() => {
    if (selectedField) {
      getTransactions();
    }
  }, [selectedField, getTransactions]);

  const onCloseSidebar = () => setSelectedField(undefined);

  if (loading)
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  return (
    <Sidebar open={!!selectedField} transactions={transactions} onClose={onCloseSidebar}>
      <Table categories={categories} grossProfit={grossProfit} netIncome={netIncome} selectedField={selectedField} onSelectField={setSelectedField} />
    </Sidebar>
  );
};

export default App;
