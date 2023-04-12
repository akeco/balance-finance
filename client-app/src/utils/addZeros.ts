export const addZeroes = (num: number): string => num.toFixed(Math.max(num.toString().split('.')[1]?.length, 2) || 2);
