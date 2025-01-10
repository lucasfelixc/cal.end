import {FunctionComponent, ReactNode} from 'react';
import {FormControl, FormLabel} from '@/components/ui/Form';
import {RadioGroupItem} from '@/components/ui/RadioGroup';
import {PaymentWay} from '@/hooks/useDonatorInfo';
import {CreditCard, Barcode} from 'lucide-react';

export type PaymentWayCardProps = {
    isSelected: boolean,
    value: PaymentWay,
};

export const PaymentWayCard: FunctionComponent<PaymentWayCardProps> = props => {
    const {isSelected, value} = props;

    return (
        <FormLabel
            htmlFor={value}
            data-selected={isSelected}
            className={
                'flex flex-col w-full p-3'
                + 'text-medium-gray text-sm bg-white border'
                + ' border-gray-400 rounded-lg cursor-pointer'
                + ' data-[selected=true]:border-indigo-600'
                + ' data-[selected=true]:border-2'
                + ' hover:text-gray-600 hover:bg-gray-100'
            }
        >
            <FormControl>
                <RadioGroupItem
                    id={value}
                    value={value}
                    className="sr-only peer"
                    aria-label={getPaymentWayType(value)}
                />
            </FormControl>
            <div className="flex items-center gap-4 p-4">
                <div className="border border-gray-300 rounded-full p-2">
                    {getPaymentWayIcon(value)}
                </div>
                <div className="flex flex-col gap-2">
                    <span
                        data-selected={isSelected}
                        className={
                            'font-normal text-gray-700'
                    + ' data-[selected=true]:text-indigo-600'
                        }
                    >
                        {getPaymentWayType(value)}
                    </span>
                    {value === 'boleto' && (
                        <p className="text-xs font-normal text-gray-500">
                            Aprovação em 1 a 2 dias úteis
                        </p>
                    )}
                </div>
            </div>
        </FormLabel>
    );
};

const getPaymentWayType = (type: PaymentWay): string => {
    switch (type) {
        case 'card':
            return 'Cartão de crédito';
        case 'boleto':
            return 'Boleto';
        default:
            return '';
    }
};

const getPaymentWayIcon = (type: PaymentWay): ReactNode => {
    switch (type) {
        case 'card':
            return (
                <CreditCard size={16} />
            );
        case 'boleto':
            return (
                <Barcode size={16} />
            );
        default:
            return null;
    }
};
