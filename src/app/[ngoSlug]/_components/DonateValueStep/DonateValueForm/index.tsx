/* eslint-disable camelcase -- @todo update recurring_payment_enabled data to camel case */

'use client';

import {Fragment, FunctionComponent, useEffect, useState} from 'react';
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
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/Tabs';
import {NgoData} from '@/app/[ngoSlug]/_ngoData';
import {getValueWithTax} from '@/utils/convertValues';
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
    include_taxes: z.boolean({
        required_error: 'Este campo não pode ser vazio.',
    })
        .default(true),
});

type TFormSchema = z.infer<typeof formSchema>;

type DonateValueFormProps = {
  slug: string,
  products: NgoData['products'],
};

export const DonateValueForm: FunctionComponent<DonateValueFormProps> = (props: DonateValueFormProps) => {
    const {slug, products} = props;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isSubscription, setIsSubscription] = useState(true);
    const [includeTaxes, setIncludeTaxes] = useState<boolean>(true);
    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const {amount, recurring_payment_enabled, include_taxes} = donatorInfo?.payment ?? {};
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            donateValue: amount?.toString(),
            subscription:
        (recurring_payment_enabled ?? null) !== null
            ? (recurring_payment_enabled ?? false) === false
            : true,
            include_taxes: include_taxes ?? true,
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
        <Fragment>
            <h2 className="mb-3 text-center font-semibold text-lg text-gray-800 leading-7">
                Faça sua {isSubscription ? 'assinatura' : 'doação'}
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500 leading-6">
                Faça a {isSubscription ? 'assinatura' : 'doação'} do bem e ajude quem mais precisa!
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="subscription"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Tabs
                                        defaultValue="subscription"
                                        className="w-full mb-6"
                                        value={field.value === true ? 'subscription' : 'one-time-donation'}
                                        onValueChange={
                                            value => {
                                                field.onChange(value === 'subscription');
                                                setIsSubscription(value === 'subscription');
                                            }
                                        }
                                    >
                                        <TabsList className="w-full">
                                            <TabsTrigger value="subscription" className="flex-1">
                                                Assinatura mensal
                                            </TabsTrigger>
                                            <TabsTrigger value="one-time-donation" className="flex-1">
                                                Doação única
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="donateValue"
                        render={({field}) => (
                            <FormItem className="flex flex-col mb-4">
                                <RadioGroup
                                    aria-label={`Valores sugeridos de ${isSubscription ? 'assinatura' : 'doação'}`}
                                    className="grid grid-cols-3 pb-8"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {products.map(
                                        product => (
                                            <FormItem key={product.name} className="w-full">
                                                <RadioCardItem
                                                    isSubscription={isSubscription}
                                                    isSelected={
                                                        field.value
                                                        === (includeTaxes === true
                                                            ? getValueWithTax(product.price / 100, 4)
                                                            : product.price / 100).toString()
                                                    }
                                                    field={{
                                                        id: (product.price).toString(),
                                                        value: includeTaxes === true
                                                            ? getValueWithTax(product.price / 100, 4)
                                                            : product.price / 100,
                                                    }}
                                                />
                                            </FormItem>
                                        ),
                                    )}
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
                        name="include_taxes"
                        render={({field}) => (
                            <FormItem className="flex items-center gap-4 my-5">
                                <FormControl>
                                    <Switch
                                        id="include_taxes"
                                        checked={field.value === true}
                                        aria-label="Cobrir taxas administrativas da doação."
                                        onCheckedChange={
                                            checked => {
                                                field.onChange(checked);
                                                form.resetField('donateValue');
                                                setIncludeTaxes(checked);
                                            }
                                        }
                                    />
                                </FormControl>
                                <FormLabel htmlFor="include_taxes" className="text-sm text-gray-700 !m-0">
                                    Cobrir taxas administrativas da doação.
                                </FormLabel>
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
        </Fragment>
    );
};
