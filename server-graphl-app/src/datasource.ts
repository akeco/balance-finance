import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { GroupByResult, groupBy } from '@/utils/groupBy';
import { roundDecimals } from '@/utils/roundDecimals';

type Transaction = { id: string; balance: number; createdAt: number; updatedAt: number };
type Month = { id: string; date: number; createdAt: number; updatedAt: number; transactions: Transaction[]; total: number; subject: Subject };
type Subject = { id: string; name: string; createdAt: number; updatedAt: number; months: Month[]; category: Category };
type Category = { id: string; name: string; createdAt: number; updatedAt: number; subjects: Subject[]; total?: Total[] };
type Total = { date: number; balance: number };

const timestamp = new Date().getTime();
const categoryNames = ['Banks', 'Income', 'Cost of Goods Sold', 'Expense'];
const subjects = [
  ['First Republic Savings', 'Chase Checking', 'JPMorgan Chase', 'Bank of America'],
  ['Bank Charge & Fees', 'Legal Services', 'Taxes & Licenses', 'Office Supplies & Software'],
  ['Cost of Goods Sold', 'Cost of Goods Sold', 'Product Shipping'],
  ['Expense', 'Bank Charges & Fees', 'Legal Services', 'Office Supplies & Software', 'Taxes & Licences'],
  [],
];

const getTotalBalance = (groupedData: GroupByResult<Total>): { date: number; balance: number }[] => {
  return Object.keys(groupedData).map((key) => {
    const balance: number = groupedData[key].reduce((total, item) => (total += item.balance), 0);
    return { date: Number(key), balance: roundDecimals(balance) as number };
  });
};

const generateTransaction = (): Transaction => {
  const balance = Number(faker.finance.amount());
  const id = faker.datatype.uuid();
  const createdAt = timestamp;
  const updatedAt = timestamp;
  return { id, balance, createdAt, updatedAt };
};

export const categoriesData: Category[] = new Array(4).fill(null).map((_, i) => {
  let categoryTotal: Total[] = [];

  return {
    id: faker.datatype.uuid(),
    name: categoryNames[i],
    createdAt: timestamp,
    updatedAt: timestamp,
    subjects: new Array(4).fill(null).map((_, j) => {
      return {
        id: faker.datatype.uuid(),
        name: subjects[i][j] || faker.commerce.productName(),
        createdAt: timestamp,
        updatedAt: timestamp,
        months: new Array(12).fill(null).map((_, k) => {
          const date = dayjs(`2022-${`${k + 1}`.length === 1 ? `0${k + 1}` : k + 1}-01`).valueOf();
          const transactions = new Array(10).fill(null).map(() => generateTransaction());
          const monthTotal = roundDecimals(transactions.reduce((acc, curr) => acc + curr.balance, 0)) as number;

          categoryTotal.push({ date, balance: Number(monthTotal.toFixed(4)) });
          const groupedTotals: GroupByResult<Total> = groupBy(categoryTotal, (item: Total) => item.date.toString());
          categoryTotal = getTotalBalance(groupedTotals);

          return {
            id: faker.datatype.uuid(),
            date,
            createdAt: timestamp,
            updatedAt: timestamp,
            transactions,
            total: roundDecimals(monthTotal) as number,
            subject: {
              id: faker.datatype.uuid(),
              name: faker.commerce.productName(),
              createdAt: timestamp,
              updatedAt: timestamp,
              months: [],
              category: {
                id: faker.datatype.uuid(),
                name: faker.commerce.department(),
                createdAt: timestamp,
                updatedAt: timestamp,
                subjects: [],
              },
            },
          };
        }),
        category: {
          id: faker.datatype.uuid(),
          name: faker.commerce.department(),
          createdAt: timestamp,
          updatedAt: timestamp,
          subjects: [],
        },
      };
    }),
    total: categoryTotal,
  };
});

const getTotalGroup = (category: Category): Total[] => {
  return category.subjects
    .map((item) => item.months.map((month) => month.transactions.map((transaction) => ({ date: month.date, balance: transaction.balance }))).flat())
    .flat();
};

const groupedIncome: GroupByResult<Total> = groupBy(getTotalGroup(categoriesData[1]), (item) => item.date.toString());
const groupedSOCGS: GroupByResult<Total> = groupBy(getTotalGroup(categoriesData[2]), (item) => item.date.toString());
const groupedExpenses: GroupByResult<Total> = groupBy(getTotalGroup(categoriesData[3]), (item) => item.date.toString());

const incomeTotal: Total[] = getTotalBalance(groupedIncome);
const COGSTotal: Total[] = getTotalBalance(groupedSOCGS);
const expensesTotal: Total[] = getTotalBalance(groupedExpenses);

export const grossProfit: Total[] = incomeTotal.map((item, index) => ({
  date: item.date,
  balance: roundDecimals(item.balance - COGSTotal[index].balance) as number,
}));

export const netIncome: Total[] = grossProfit.map((item, index) => ({
  date: item.date,
  balance: roundDecimals(item.balance - expensesTotal[index].balance) as number,
}));
