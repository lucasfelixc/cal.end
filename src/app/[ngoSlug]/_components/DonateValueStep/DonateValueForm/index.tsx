/* eslint-disable camelcase -- @todo update recurring_payment_enabled data to camel case */

'use client';

import {FunctionComponent, useEffect, useState} from 'react';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/Form';
import {RadioGroup} from '@/components/ui/RadioGroup';
import {CurrencyInput} from '@/components/ui/CurrencyInput';
import {Button} from '@/components/ui/Button';
import {Switch} from '@/components/ui/Switch';
import {RadioCardItem} from './RadioCardItem';

const formSchema = z.object({
    donateValue: z
        .string({
            required_error: 'Este campo não pode ser vazio.',
        })
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    subscription: z.boolean()
        .default(false)
        .optional(),
});

type TFormSchema = z.infer<typeof formSchema>;

type DonateValueFormProps = {
  slug: string,
  isSubscription: boolean,
  setIsSubscription: (value: boolean) => void,
};

export const DonateValueForm: FunctionComponent<DonateValueFormProps> = (props: DonateValueFormProps) => {
    const {slug, isSubscription, setIsSubscription} = props;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const {amount, recurring_payment_enabled} = donatorInfo?.payment ?? {};
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            donateValue: amount?.toString(),
            subscription:
        (recurring_payment_enabled ?? null) !== null
            ? (recurring_payment_enabled ?? false) === false
            : false,
        },
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);

        setDonatorInfo(
            prev => ({
                ...prev,
                payment: {
                    ...prev?.payment,
                    amount: parseFloat(values.donateValue.replaceAll(',', '.')),
                    recurring_payment_enabled: (values.subscription ?? false) === false,
                    ngo_slug: slug,
                },
            }),
        );

        router.push(`/${slug}/dados-pessoais`);
    }

    useEffect(() => () => setLoading(false), []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="donateValue"
                    render={({field}) => (
                        <FormItem className="flex flex-col mb-4">
                            <RadioGroup
                                aria-label={`Valores sugeridos de ${isSubscription ? 'assinatura' : 'doação'}`}
                                className="flex gap-5 justify-center pb-10"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormItem>
                                    <RadioCardItem
                                        isSubscription={isSubscription}
                                        isSelected={field.value === '10'}
                                        field={{id: '10', value: '10'}}
                                    />
                                </FormItem>
                                <FormItem>
                                    <RadioCardItem
                                        isSubscription={isSubscription}
                                        isSelected={field.value === '30'}
                                        field={{id: '30', value: '30'}}
                                    />
                                </FormItem>
                                <FormItem>
                                    <RadioCardItem
                                        isSubscription={isSubscription}
                                        isSelected={field.value === '50'}
                                        field={{id: '50', value: '50'}}
                                    />
                                </FormItem>
                            </RadioGroup>
                            <FormItem>
                                <FormLabel htmlFor="donate-value" className="font-normal text-gray-700">
                                    Caso prefira, digite o valor desejado para a
                                    {isSubscription ? ' assinatura' : ' doação'}:
                                </FormLabel>
                                <CurrencyInput
                                    id="donate-value"
                                    aria-label={`Valor da ${isSubscription ? 'assinatura' : 'doação'}`}
                                    placeholder="R$ 150,00"
                                    decimalsLimit={2}
                                    name={field.name}
                                    disabled={field.disabled}
                                    ref={field.ref}
                                    defaultValue={field.value}
                                    value={field.value}
                                    onValueChange={value => field.onChange(value)}
                                    onBlur={field.onBlur}
                                />
                                <FormMessage />
                            </FormItem>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subscription"
                    render={({field}) => (
                        <FormItem>
                            <div className="py-5 ">
                                <FormLabel htmlFor="switch" className="flex gap-6">
                                    <FormControl>
                                        <Switch
                                            id="switch"
                                            checked={field.value}
                                            aria-label="Desejo doar apenas uma vez, não assinar."
                                            onCheckedChange={
                                                checked => {
                                                    field.onChange(checked);
                                                    setIsSubscription(checked === false);
                                                }
                                            }
                                        />
                                    </FormControl>
                                    <p className="text-sm text-gray-700">
                                        Desejo doar apenas uma vez, não assinar.
                                    </p>
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button
                    aria-label="Continuar"
                    className="mb-5 w-full"
                    type="submit"
                    variant="brand"
                    loading={loading}
                >
                    Continuar
                </Button>
            </form>
        </Form>
    );
};
