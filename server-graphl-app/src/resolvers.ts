import { Resolvers } from '@/types/types';
import { categoriesData } from '@/datasource';

const resolvers: Resolvers = {
  Query: {
    categories: () => categoriesData,
    subjects: () => [],
    months: () => [],
    transactions: () => [],
  },
};

export { resolvers };
