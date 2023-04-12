import { describe, it, expect } from 'vitest';
import { GET_TRANSACTIONS, useGetTransactions } from '@/queries/useGetTransactions';
import { Transaction } from '@/types';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { SelectedField } from '@/App';

const timestamp = new Date().getTime();

const mockSelectedFields: SelectedField = {
  monthId: '01-2022',
  subjectId: 'subject-id',
  categoryId: 'category-id',
};

const mockData: Transaction[] = [
  {
    id: '1',
    company: 'Company 1',
    description: 'Transaction 1',
    balance: 100,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: '2',
    company: 'Company 2',
    description: 'Transaction 2',
    balance: -50,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_TRANSACTIONS,
      variables: mockSelectedFields,
    },
    result: { data: { transactions: mockData } },
  },
];

describe('useGetTransactions', () => {
  it('should return loading while fetching data', async () => {
    const { result } = renderHook(() => useGetTransactions(mockSelectedFields), {
      wrapper: ({ children }: { children: React.ReactNode }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    expect(result.current[1].loading).toBe(false);
  });

  it('should return transactions data when query is successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetTransactions(mockSelectedFields), {
      wrapper: ({ children }: { children: React.ReactNode }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    result.current[0]();

    expect(result.current[1].loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current[1].loading).toBe(false);
    expect(result.current[1].transactions).toEqual(mockData);
  });

  it('should remove transaction by id', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetTransactions(mockSelectedFields), {
      wrapper: ({ children }: { children: React.ReactNode }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    result.current[0]();
    await waitForNextUpdate();

    const transactionId = mockData[0].id;
    result.current[1].removeTransaction(transactionId);
    expect(result.current[1].transactions.length).toEqual(mockData.length - 1);
  });
});
