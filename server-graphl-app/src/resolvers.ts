import { Resolvers } from '@/types/types';
import { categoriesData, grossProfit, netIncome } from '@/datasource';

const resolvers: Resolvers = {
  Query: {
    categories: () => categoriesData,
    grossProfit: () => grossProfit,
    netIncome: () => netIncome,
    subjects: () => [],
    months: () => [],
    transactions: () => [],
  },
};

export { resolvers };
