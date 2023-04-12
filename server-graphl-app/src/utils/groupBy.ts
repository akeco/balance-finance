export type GroupByResult<T> = { [key: string]: T[] };

/* eslint-disable */

export const groupBy = <T>(collection: T[], iteratee: (item: T) => string): GroupByResult<T> => {
  return collection.reduce<GroupByResult<T>>((result, item) => {
    const key = iteratee(item);
    (result[key] || (result[key] = [])).push(item);
    return result;
  }, {} as GroupByResult<T>);
};
