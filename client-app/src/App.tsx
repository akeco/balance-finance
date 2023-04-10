import { Table } from '@/components/table/table';
import { CircularProgress, Box } from '@mui/material';
import { useGetCategories } from '@/queries/useGetCategories';

const App = () => {
  const { loading, categories } = useGetCategories();

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  return <Table categories={categories} />;
};

export default App;
