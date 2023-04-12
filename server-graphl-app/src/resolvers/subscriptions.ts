export const TRANSACTION_CHANGE = 'TRANSACTION_CHANGE';

export const Subscription = {
  categoryUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(TRANSACTION_CHANGE),
    resolve: (payload) => payload,
  },
};
