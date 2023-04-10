export const roundDecimals = (numb: number): number | TypeError => {
  if (typeof numb !== 'number') throw new TypeError();
  return Math.round(numb * 100) / 100;
};
