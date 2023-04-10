import { roundDecimals } from '@/utils/roundDecimals';

describe('roundDecimals', () => {
  it('should round the number to two decimal places', () => {
    expect(roundDecimals(3.14159)).toEqual(3.14);
    expect(roundDecimals(1.23456789)).toEqual(1.23);
    expect(roundDecimals(0.123)).toEqual(0.12);
  });

  it('should return NaN when the input is not a number', () => {
    expect(() => {
      roundDecimals('not a number' as unknown as number);
    }).toThrow(TypeError);
  });
});
