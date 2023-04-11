import { Resolvers } from '@/types/types';
import { categoriesData, getTransactions, grossProfit, netIncome } from '@/datasource';

const resolvers: Resolvers = {
  Query: {
    categories: () => categoriesData,
    grossProfit: () => grossProfit,
    netIncome: () => netIncome,
    transactions: getTransactions,
  },
};

export { resolvers };
