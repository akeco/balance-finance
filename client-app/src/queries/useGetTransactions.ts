import { SelectedField } from '@/App';
import { Transaction } from '@/types';
import { gql, useLazyQuery } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($monthId: String!, $subjectId: String!, $categoryId: String!) {
    transactions(monthId: $monthId, subjectId: $subjectId, categoryId: $categoryId) {
      id
      company
      description
      balance
      createdAt
    }
  }
`;

type UseGetDataResult = [() => void, { loading: boolean; transactions: Transaction[] }];

export const useGetTransactions = (selectedFields: SelectedField | undefined): UseGetDataResult => {
  const [getTransactions, { loading, data }] = useLazyQuery(GET_TRANSACTIONS, { variables: selectedFields });

  return [getTransactions, { loading, transactions: data?.transactions ?? [] }];
};
