import { gql, useMutation, MutationFunctionOptions, DefaultContext, ApolloCache } from '@apollo/client';

// Define mutation
const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($monthId: String!, $subjectId: String!, $categoryId: String!, $transactionId: String!) {
    updateTransaction(monthId: $monthId, subjectId: $subjectId, categoryId: $categoryId, transactionId: $transactionId)
  }
`;

export type TransactionMutation = [
  (
    options?:
      | MutationFunctionOptions<
          {
            updateTransaction: boolean;
          },
          {
            monthId: string;
            subjectId: string;
            categoryId: string;
            transactionId: string;
          },
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<any>,
  { data: boolean | undefined | null | undefined; loading: boolean; error: unknown },
];

export const useUpdateTransaction = (): TransactionMutation => {
  const [mutateFunction, { data, loading, error }] = useMutation<
    { updateTransaction: boolean },
    {
      monthId: string;
      subjectId: string;
      categoryId: string;
      transactionId: string;
    }
  >(UPDATE_TRANSACTION);

  return [mutateFunction, { data: data?.updateTransaction, loading, error }];
};
