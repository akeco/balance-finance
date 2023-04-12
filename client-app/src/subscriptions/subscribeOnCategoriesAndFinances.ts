import gql from 'graphql-tag';
import { CATEGORIES_AND_FINANCES_FIELDS } from '@/fragments';

export const TRANSACTION_CHANGE_SUBSCRIPTION = gql`
  ${CATEGORIES_AND_FINANCES_FIELDS}
  subscription onTransactionUpdate {
    categoryUpdated {
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
  }
`;
