import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useGetCategoriesAndFinances, CategoriesFinancesResult, GET_CATEGORIES_FINANCES } from '@/queries/useGetCategoriesAndFinances';
import { Category, Total } from '@/types';

const timestamp = new Date().getTime();

const mockData: CategoriesFinancesResult = {
  loading: false,
  error: null,
  categories: [{ id: '1', name: 'category 1' }] as Category[],
  grossProfit: [{ date: timestamp, balance: 100 }] as Total[],
  netIncome: [{ date: timestamp, balance: 200 }] as Total[],
};

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_CATEGORIES_FINANCES,
    },
    result: { data: mockData },
  },
];

describe('useGetCategoriesAndFinances', () => {
  it('should return categories and finances data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetCategoriesAndFinances(), {
      wrapper: ({ children }: { children: React.ReactNode }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.grossProfit).toEqual(mockData.grossProfit);
    expect(result.current.netIncome).toEqual(mockData.netIncome);
  });

  it('should return an error if the query fails', async () => {
    const errorMessage = 'Error message';
    const errorMocks: MockedResponse[] = [
      {
        request: {
          query: GET_CATEGORIES_FINANCES,
        },
        error: new Error(errorMessage),
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useGetCategoriesAndFinances(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={errorMocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.categories).toEqual([]);
    expect(result.current.grossProfit).toEqual([]);
    expect(result.current.netIncome).toEqual([]);
  });
});
