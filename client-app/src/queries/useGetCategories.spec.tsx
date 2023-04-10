import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useGetCategories, GET_CATEGORIES } from './useGetCategories';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';

describe('useGetCategories', () => {
  const categoriesMock = [
    {
      id: 1,
      name: 'Category 1',
      total: {
        balance: 100,
        date: '2022-01-01',
      },
      subjects: [
        {
          id: 1,
          name: 'Subject 1',
          months: [
            {
              id: 1,
              date: '2022-01-01',
              total: 50,
            },
            {
              id: 2,
              date: '2022-02-01',
              total: 100,
            },
          ],
        },
      ],
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_CATEGORIES,
      },
      result: {
        data: {
          categories: categoriesMock,
        },
      },
    },
  ];

  const wrapper: React.FC<MockedProviderProps> = ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>;

  it('should return loading initially', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetCategories(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
  });

  it('should return error if query fails', async () => {
    const errorMock = {
      request: {
        query: GET_CATEGORIES,
      },
      error: new Error('Error'),
    };

    const errorWrapper: React.FC<MockedProviderProps> = ({ children }) => (
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useGetCategories(), {
      wrapper: errorWrapper,
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
  });

  it('should return categories if query succeeds', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetCategories(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.categories).toEqual(categoriesMock);
  });
});
