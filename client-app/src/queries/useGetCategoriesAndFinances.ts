import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Category, Total } from '@/types';
import { TRANSACTION_CHANGE_SUBSCRIPTION } from '@/subscriptions/subscribeOnCategoriesAndFinances';
import { CATEGORIES_AND_FINANCES_FIELDS } from '@/fragments';

export const GET_CATEGORIES_FINANCES = gql`
  ${CATEGORIES_AND_FINANCES_FIELDS}
  query GetCategoriesAndFinances {
    grossProfit {
      date
      balance
    }
    netIncome {
      date
      balance
    }
    categories {
      ...CategoriesAndFinancesFields
    }
  }
`;

export type CategoriesFinancesResult = {
  loading: boolean;
  error: unknown;
  categories: Category[];
  grossProfit: Total[];
  netIncome: Total[];
};

export const useGetCategoriesAndFinances = (): CategoriesFinancesResult => {
  const { loading, data, error, subscribeToMore } = useQuery(GET_CATEGORIES_FINANCES);

  subscribeToMore({
    document: TRANSACTION_CHANGE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      return {
        ...prev,
        categories: subscriptionData.data.categoryUpdated.categories,
        grossProfit: subscriptionData.data.categoryUpdated.grossProfit,
        netIncome: subscriptionData.data.categoryUpdated.netIncome,
      };
    },
  });

  return {
    loading,
    error,
    categories: data?.categories ?? [],
    grossProfit: data?.grossProfit ?? [],
    netIncome: data?.netIncome ?? [],
  };
};
