import { DataProvider } from '@/datasource';
import { TransactionArgs } from '@/types';
import { TRANSACTION_CHANGE } from '@/resolvers/subscriptions';
import { getGrossProfit, getNetIncome } from '@/resolvers/queries';

const updateTransaction = (_, args: TransactionArgs, { pubsub }) => {
  try {
    const categories = DataProvider.updateTransaction(args);
    const grossProfit = getGrossProfit();
    const netIncome = getNetIncome();
    pubsub.publish(TRANSACTION_CHANGE, { categories, grossProfit, netIncome });
    return true;
  } catch (err: unknown) {
    return false;
  }
};

export const Mutation = {
  updateTransaction,
};
