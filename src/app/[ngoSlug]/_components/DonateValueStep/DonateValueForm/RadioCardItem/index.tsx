import {FormControl, FormLabel} from '@/components/ui/Form';
import {RadioGroupItem} from '@/components/ui/RadioGroup';
import {moneyFormatter} from '@/utils/convertValues';
import {FunctionComponent} from 'react';

export type RadioCardItemProps = {
    isSelected: boolean,
    isSubscription: boolean,
    field: {
        id: string,
        value: number,
    },
};

export const RadioCardItem: FunctionComponent<RadioCardItemProps> = props => {
    const {isSelected, isSubscription, field} = props;

    return (
        <FormLabel
            htmlFor={field.id}
            data-selected={isSelected}
            className={
                'flex items-center justify-center flex-col w-full h-24 p-3'
                + 'text-medium-gray text-sm bg-white border'
                + ' border-gray-400 rounded-lg cursor-pointer'
                + ' data-[selected=true]:border-indigo-600'
                + ' data-[selected=true]:border-2'
                + ' hover:text-gray-600 hover:bg-gray-100'
            }
        >
            <FormControl>
                <RadioGroupItem
                    id={field.id}
                    value={field.value.toString()}
                    className="sr-only peer"
                    aria-label={
                        `${isSubscription
                            ? 'Assine'
                            : 'Doe'
                        } ${field.value} reais${isSubscription ? ' por mês' : ''}`
                    }
                />
            </FormControl>
            <p
                data-selected={isSelected}
                className={
                    'text-center font-normal text-gray-700'
                    + ' data-[selected=true]:text-indigo-600'
                }
            >
                <span className="text-xs">{isSubscription ? 'Assine' : 'Doe'}</span>
                <span className="block">
                    <span className="block font-bold">{moneyFormatter(field.value)}</span>
                    <span className="text-xs">{isSubscription && '/mês'}</span>
                </span>
            </p>
        </FormLabel>
    );
};
