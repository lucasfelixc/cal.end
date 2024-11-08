import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export const cpfMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const creditCardMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    return value
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2');
};

export const cepMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
};

export const phoneMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
};

export const dateMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    let newValue = value;

    newValue = newValue.replace(/\D/g, '');

    if (newValue.length > 2) {
        newValue = `${newValue.substring(0, 2)}/${newValue.substring(2)}`;
    }

    return newValue;
};

export const currencyMask = (value: string | null): string | null => {
    if (value === null) {
        return '';
    }

    const numericValue = value.replace(/\D/g, '');

    if ((numericValue ?? null) === null) {
        return 'R$ 0,00';
    }

    const intValue = parseInt(numericValue, 10);
    const cents = (intValue % 100).toString().padStart(2, '0');
    const real = Math.floor(intValue / 100).toLocaleString('pt-BR');

    return `R$ ${real},${cents}`;
};
