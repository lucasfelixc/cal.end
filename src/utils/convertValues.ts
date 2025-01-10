export const centsConverter = (value: number): number => value / 100;

export const moneyFormatter = (value: number): string => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).format(value);

export const getValueWithTax = (value: number, tax: number): number => Number((value / (1 - (tax / 100))).toFixed(2));
