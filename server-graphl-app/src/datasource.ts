import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { GroupByResult, groupBy } from '@/utils/groupBy';
import { roundDecimals } from '@/utils/roundDecimals';
import { Transaction, Category, Total, Month } from '@/types';
import { TransactionArgs } from '@/types';

const timestamp = new Date().getTime();
const categoryNames = ['Banks', 'Income', 'Cost of Goods Sold', 'Expense'];
const subjects = [
  ['First Republic Savings', 'Chase Checking', 'JPMorgan Chase', 'Bank of America'],
  ['Bank Charge & Fees', 'Legal Services', 'Taxes & Licenses', 'Office Supplies & Software'],
  ['Cost of Goods Sold', 'Cost of Goods Sold', 'Product Shipping'],
  ['Expense', 'Bank Charges & Fees', 'Legal Services', 'Office Supplies & Software', 'Taxes & Licences'],
];

export const getTotalBalance = (groupedData: GroupByResult<Total>): { date: number; balance: number }[] => {
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
  const company = faker.company.name();
  const description = faker.company.catchPhrase();
  return { id, balance, company, description, createdAt, updatedAt };
};

const getMonthTotal = (transactions: Transaction[]): number => roundDecimals(transactions.reduce((acc, curr) => acc + curr.balance, 0)) as number;

let categoriesData: Category[] = new Array(4).fill(null).map((_, i) => {
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
          const monthTotal: number = getMonthTotal(transactions);

          categoryTotal.push({ date, balance: Number(monthTotal.toFixed(4)) });
          const groupedTotals: GroupByResult<Total> = groupBy(categoryTotal, (item: Total) => item.date.toString());
          categoryTotal = getTotalBalance(groupedTotals);

          return {
            id: faker.datatype.uuid(),
            date,
            createdAt: timestamp,
            updatedAt: timestamp,
            transactions,
            total: monthTotal,
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

class DataProviderClass {
  private data: Category[] = categoriesData;

  getData = (): Category[] => this.data;

  setData = (categories: Category[]) => (this.data = categories);

  findTransactionById = ({ monthId, transactionId }: Partial<TransactionArgs>): Transaction | undefined => {
    let transaction: Transaction | undefined;
    this.getData().forEach((item) => {
      item.subjects.forEach((subject) => {
        const month = subject.months.find((month) => month.id === monthId);
        const foundTransaction = month?.transactions.find((item) => item.id === transactionId);
        if (foundTransaction) transaction = foundTransaction;
      });
    });
    return transaction;
  };

  findMonthById = (monthId: string): Month | undefined => {
    let month: Month | undefined;
    this.getData().forEach((item) => {
      item.subjects.forEach((subject) => {
        const foundMonth = subject.months.find((month) => month.id === monthId);
        if (foundMonth) month = foundMonth;
      });
    });
    return month;
  };

  removeTransactionById = (transactionId: string) => {
    let categories: Category[] = [...this.getData()];

    categories.forEach((category) => {
      let categoryTotal: Total[] = [];

      category.subjects.forEach((subject) => {
        subject.months.forEach((month) => {
          month.transactions = month.transactions.map((transaction) => {
            if (transaction.id === transactionId) {
              return { ...transaction, balance: 0, company: '', description: '', updatedAt: new Date().getTime() };
            }
            return transaction;
          });
          const monthTotal: number = getMonthTotal(month.transactions);
          month.total = monthTotal;

          categoryTotal.push({ date: month.date, balance: Number(monthTotal.toFixed(4)) });
          const groupedTotals: GroupByResult<Total> = groupBy(categoryTotal, (item: Total) => item.date.toString());
          categoryTotal = getTotalBalance(groupedTotals);
        });
      });
      category.total = categoryTotal;
    });

    this.setData(categories);
  };

  updateTransaction = ({ categoryId, monthId, subjectId, transactionId }: TransactionArgs) => {
    const transaction: Transaction | undefined = this.findTransactionById({ monthId, transactionId });
    const month: Month | undefined = this.findMonthById(monthId);

    this.removeTransactionById(transactionId);
    let categories: Category[] = [...this.getData()];

    categories.forEach((category) => {
      let categoryTotal: Total[] = [];

      category.subjects.forEach((subject) => {
        subject.months.forEach((monthItem) => {
          if (
            category.id === categoryId &&
            subject.id === subjectId &&
            dayjs(monthItem.date).isSame(dayjs(month?.date), 'year') &&
            dayjs(monthItem.date).isSame(dayjs(month?.date), 'month')
          ) {
            monthItem.transactions.push(transaction!);
          }
          const monthTotal: number = getMonthTotal(monthItem.transactions);
          monthItem.total = monthTotal;

          categoryTotal.push({ date: monthItem.date, balance: Number(monthTotal.toFixed(4)) });
          const groupedTotals: GroupByResult<Total> = groupBy(categoryTotal, (item: Total) => item.date.toString());
          categoryTotal = getTotalBalance(groupedTotals);
        });
      });
      category.total = categoryTotal;
    });

    this.setData(categories);
    return this.getData();
  };
}

export const DataProvider = new DataProviderClass();
