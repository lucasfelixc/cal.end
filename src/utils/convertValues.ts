export const centsConverter = (value: number): number => value / 100;

export const moneyFormatter = (value: number): string => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).format(value);
