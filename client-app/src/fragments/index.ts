import { gql } from '@apollo/client';

export const CATEGORIES_AND_FINANCES_FIELDS = gql`
  fragment CategoriesAndFinancesFields on Category {
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
`;
