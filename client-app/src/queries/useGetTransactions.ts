import { SelectedField } from '@/App';
import { Transaction } from '@/types';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

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

export type TransactionsResult = [() => void, { loading: boolean; transactions: Transaction[]; removeTransaction(id: string): void }];

export const useGetTransactions = (selectedFields: SelectedField | undefined): TransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [getTransactions, { loading, data }] = useLazyQuery(GET_TRANSACTIONS, { variables: selectedFields, fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
  }, [data?.transactions]);

  const removeTransaction = (transactionId: string) => {
    setTransactions((transactions) => transactions.filter((item) => item.id !== transactionId));
  };

  return [getTransactions, { loading, transactions, removeTransaction }];
};
