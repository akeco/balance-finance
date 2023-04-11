import React from 'react';
import { useGetTransactions, GET_TRANSACTIONS } from '@/queries/useGetTransactions';
import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';

describe('useGetTransactions', () => {
  const selectedFields = {
    monthId: '2022-01',
    subjectId: 'abc123',
    categoryId: 'xyz789',
  };

  const mockData = {
    data: {
      transactions: [
        {
          id: '123',
          company: 'Acme Corp',
          description: 'Payment for goods',
          balance: 100.0,
          createdAt: '2022-01-01',
        },
        {
          id: '456',
          company: 'Widget Inc',
          description: 'Purchase of widgets',
          balance: -50.0,
          createdAt: '2022-01-02',
        },
      ],
    },
  };

  const mocks = [
    {
      request: {
        query: GET_TRANSACTIONS,
        variables: selectedFields,
      },
      result: mockData,
    },
  ];

  test('returns the correct result when loading is false', async () => {
    const wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
      return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
    };

    const { result, waitForNextUpdate } = renderHook(() => useGetTransactions(selectedFields), {
      wrapper,
    });
    const [getTransactions, { transactions }] = result.current;

    expect(transactions).toEqual([]);

    getTransactions();

    await waitForNextUpdate();

    expect(result.current[1].loading).toBe(false);
    expect(result.current[1].transactions).toEqual(mockData.data.transactions);
  });

  test('returns the correct result when loading is true', () => {
    const wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
      return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
    };

    const { result } = renderHook(() => useGetTransactions(selectedFields), {
      wrapper,
    });
    const [getTransactions, { transactions }] = result.current;

    expect(getTransactions).toBeDefined();
    expect(transactions).toEqual([]);
  });
});
