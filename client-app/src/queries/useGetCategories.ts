import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Category } from '@/types';

export const GET_CATEGORIES = gql`
  query getCategoriese {
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

export const useGetCategories = (): { loading: boolean; error: unknown; categories: Category[] } => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  return {
    loading,
    error,
    categories: data?.categories ?? [],
  };
};
