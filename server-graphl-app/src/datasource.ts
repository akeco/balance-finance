import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { GroupByResult, groupBy } from '@/utils/groupBy';
import { roundDecimals } from '@/utils/roundDecimals';

type Transaction = { id: string; balance: number; createdAt: number; updatedAt: number };
type Month = { id: string; date: number; createdAt: number; updatedAt: number; transactions: Transaction[]; total: number; subject: Subject };
type Subject = { id: string; name: string; createdAt: number; updatedAt: number; months: Month[]; category: Category };
type Category = { id: string; name: string; createdAt: number; updatedAt: number; subjects: Subject[]; total: Total[] };
type Total = { date: number; balance: number };

const timestamp = new Date().getTime();
const categories = ['Banks', 'Income', 'Cost of Goods Sold', 'Expense', 'Net Income'];
const subjects = [
  ['First Republic Savings', 'Chase Checking', 'JPMorgan Chase', 'Bank of America'],
  ['Bank Charge & Fees', 'Legal Services', 'Taxes & Licenses', 'Office Supplies & Software'],
  ['Cost of Goods Sold', 'Cost of Goods Sold', 'Product Shipping'],
  ['Expense', 'Bank Charges & Fees', 'Legal Services', 'Office Supplies & Software', 'Taxes & Licences'],
  [],
];

const generateTransaction = (): Transaction => {
  const balance = Number(faker.finance.amount());
  const id = faker.datatype.uuid();
  const createdAt = timestamp;
  const updatedAt = timestamp;
  return { id, balance, createdAt, updatedAt };
};

const generateMonth = (monthIndex: number, subject: Subject): Month => {
  const id = faker.datatype.uuid();
  const date = dayjs(`2022-${`${monthIndex + 1}`.length === 1 ? `0${monthIndex + 1}` : monthIndex + 1}-01`).valueOf();
  const transactions = new Array(10).fill(null).map(() => generateTransaction());
  const total = roundDecimals(transactions.reduce((acc, curr) => acc + curr.balance, 0)) as number;
  const createdAt = timestamp;
  const updatedAt = timestamp;
  return { id, date, createdAt, updatedAt, transactions, total, subject };
};

export const categoriesData = new Array(5).fill(null).map((_, i) => {
  let categoryTotal: Total[] = [];

  return {
    id: faker.datatype.uuid(),
    name: categories[i],
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

          categoryTotal = Object.keys(groupedTotals).map((key) => {
            const balance: number = groupedTotals[key].reduce((total, item) => (total += item.balance), 0);
            return { date: Number(key), balance: roundDecimals(balance) as number };
          });

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
