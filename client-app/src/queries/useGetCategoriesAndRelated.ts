import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Category, Total } from '@/types';

export const GET_CATEGORIES = gql`
  query getCategoriesAndRelated {
    grossProfit {
      date
      balance
    }
    netIncome {
      date
      balance
    }
    categories {
      id
      name
      total {
        balance
        date
      }
      subjects {
        id
        name
        months {
          id
          date
          total
        }
      }
    }
  }
`;

export const useGetCategoriesAndRelated = (): {
  loading: boolean;
  error: unknown;
  categories: Category[];
  grossProfit: Total[];
  netIncome: Total[];
} => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  return {
    loading,
    error,
    categories: data?.categories ?? [],
    grossProfit: data?.grossProfit ?? [],
    netIncome: data?.netIncome ?? [],
  };
};
