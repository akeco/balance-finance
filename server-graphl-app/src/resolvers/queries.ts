import { roundDecimals } from '@/utils/roundDecimals';
import { Category, Total, Transaction } from '@/types';
import { GroupByResult, groupBy } from '@/utils/groupBy';
import { getTotalBalance, DataProvider } from '@/datasource';
import { TransactionArgs } from '@/types';

const getTotalGroup = (category: Category): Total[] => {
  return category.subjects
    .map((item) => item.months.map((month) => month.transactions.map((transaction) => ({ date: month.date, balance: transaction.balance }))).flat())
    .flat();
};

const groupedIncome = (): GroupByResult<Total> => groupBy(getTotalGroup(DataProvider.getData()[1]), (item) => item.date.toString());
const groupedSOCGS = (): GroupByResult<Total> => groupBy(getTotalGroup(DataProvider.getData()[2]), (item) => item.date.toString());
const groupedExpenses = (): GroupByResult<Total> => groupBy(getTotalGroup(DataProvider.getData()[3]), (item) => item.date.toString());

const incomeTotal = (): Total[] => getTotalBalance(groupedIncome());
const COGSTotal = (): Total[] => getTotalBalance(groupedSOCGS());
const expensesTotal = (): Total[] => getTotalBalance(groupedExpenses());

export const getCategories = (): Category[] => DataProvider.getData();

export const getGrossProfit = (): Total[] =>
  incomeTotal().map((item, index) => ({
    date: item.date,
    balance: roundDecimals(item.balance - COGSTotal()[index].balance) as number,
  }));

export const getNetIncome = (): Total[] =>
  getGrossProfit().map((item, index) => ({
    date: item.date,
    balance: roundDecimals(item.balance - expensesTotal()[index].balance) as number,
  }));

export const getTransactions = (_, args: TransactionArgs): Transaction[] => {
  const category = DataProvider.getData().find((item) => item.id === args.categoryId);
  const subject = category?.subjects.find((item) => item.id === args.subjectId);
  const month = subject?.months.find((item) => item.id === args.monthId);
  return month?.transactions.filter((item) => item.balance) ?? [];
};

export const Query = {
  categories: getCategories,
  grossProfit: getGrossProfit,
  netIncome: getNetIncome,
  transactions: getTransactions,
};
