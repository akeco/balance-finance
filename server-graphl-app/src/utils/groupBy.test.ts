import { groupBy } from '@/utils/groupBy';

describe('groupBy', () => {
  it('should group the collection by the result of the iteratee function', () => {
    const collection = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 30 },
    ];

    const result = groupBy(collection, (item) => item.age.toString());

    expect(result).toEqual({
      '25': [{ name: 'Bob', age: 25 }],
      '30': [
        { name: 'Alice', age: 30 },
        { name: 'Charlie', age: 30 },
      ],
    });
  });

  it('should return an empty object when the collection is empty', () => {
    const collection: any[] = [];

    const result = groupBy(collection, (item) => item.toString());

    expect(result).toEqual({});
  });

  it('should handle null and undefined values in the collection', () => {
    const collection = [null, undefined];

    const result = groupBy(collection, (item) => item);

    expect(result).toEqual({
      null: [null],
      undefined: [undefined],
    });
  });
});
