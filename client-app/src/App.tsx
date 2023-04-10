import { Table } from '@/components/table/table';
import { CircularProgress, Box } from '@mui/material';
import { useGetCategoriesAndRelated } from '@/queries/useGetCategoriesAndRelated';
import { CenteredBox } from '@/styles/styled-components';

const App = () => {
  const { loading, categories, grossProfit, netIncome } = useGetCategoriesAndRelated();

  if (loading)
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  return <Table categories={categories} grossProfit={grossProfit} netIncome={netIncome} />;
};

export default App;
