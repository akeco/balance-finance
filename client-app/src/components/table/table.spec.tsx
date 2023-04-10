import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Table } from '@/components/table/table';
import { Category } from '@/types';

const timestamp = new Date().getTime();
const timeObject = {
  createdAt: timestamp,
  updatedAt: timestamp,
};

const categories: Category[] = [
  {
    id: '1',
    name: 'Category 1',
    ...timeObject,
    subjects: [
      {
        id: '12',
        name: 'Subject 1',
        ...timeObject,
        months: [
          {
            id: '13',
            date: timestamp,
            ...timeObject,
            transactions: [
              {
                id: '14',
                description: 'Transaction 1',
                balance: 100,
                ...timeObject,
              },
              {
                id: '2',
                description: 'Transaction 2',
                balance: -50,
                ...timeObject,
              },
            ],
          },
          {
            id: '21',
            date: timestamp,
            ...timeObject,
            transactions: [
              {
                id: '3',
                description: 'Transaction 3',
                balance: 200,
                ...timeObject,
              },
            ],
          },
        ],
      },
      {
        id: '22',
        name: 'Subject 2',
        ...timeObject,
        months: [
          {
            id: '31',
            date: timestamp,
            ...timeObject,
            transactions: [
              {
                id: '42',
                description: 'Transaction 4',
                balance: 150,
                ...timeObject,
              },
            ],
          },
        ],
      },
    ],
  },
];

describe('Table', () => {
  it('should render table rows', () => {
    const { getAllByRole } = render(<Table categories={categories} />);
    const tableRows = getAllByRole('row');
    expect(tableRows.length).toBe(2); // 2 category rows + 1 subject row, but subject is initialy hidden, does not exist in dom
  });

  it('should render category name', () => {
    const { getByText } = render(<Table categories={categories} />);
    const categoryName = getByText('Category 1');
    expect(categoryName).toBeTruthy();
  });
});
