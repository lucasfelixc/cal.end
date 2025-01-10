'use client';

import {FunctionComponent, useEffect, useState} from 'react';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/Form';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {cpfMask, creditCardMask, dateMask} from '@/lib/utils';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';
import {cpfValidator} from '@/utils/cpfValidator';

export type TFormSchema = z.infer<typeof formSchema>;

type CreditCardFormProps = {
  slug: string,
};

export const CreditCardForm: FunctionComponent<CreditCardFormProps> = ({slug}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const {creditCard} = donatorInfo?.paymentMethodInfo ?? {};
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: creditCard?.cardNumber,
            cardHolderName: creditCard?.cardHolderName,
            cvc: creditCard?.cvc,
            expirationDate:
        (creditCard?.exp_month ?? null) !== null && (creditCard?.exp_year ?? null) !== null
            ? `${creditCard?.exp_month}/${creditCard?.exp_year}`
            : '',
            cpf: creditCard?.cpf,
        },
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);
        const paymentMethodInfo = {
            creditCard: {
                ...values,
                cardNumber: values.cardNumber.replaceAll(/[^0-9]+/g, ''),
                cpf: values.cpf.replaceAll(/[^0-9]+/g, ''),
                exp_month: values.expirationDate.split('/')[0],
                exp_year: values.expirationDate.split('/')[1],
            },
        };

        setDonatorInfo(
            prev => ({
                ...prev,
                paymentMethodInfo: paymentMethodInfo,
            }),
        );

        router.push(`/${slug}/confirmacao`);

        // try {
        //     const response = await fetch('/api/payment-checkout', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             ...donatorInfo,
        //             payment: {
        //                 ...donatorInfo?.payment,
        //                 amount: (donatorInfo?.payment?.amount ?? 0) * 100,
        //             },
        //             paymentMethodInfo: paymentMethodInfo,
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error(response.statusText);
        //     }

        //     setHasError(false);

        //     router.push(`/${slug}/sucesso`);
        // } catch (e) {
        //     setHasError(true);
        // }
    }

    useEffect(() => () => setLoading(false), []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-5 flex-col"
            >
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                Número do cartão
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    aria-label="Número do cartão"
                                    inputMode="numeric"
                                    maxLength={19}
                                    placeholder="0000 0000 0000 0000"
                                    onChange={value => field.onChange(creditCardMask(value.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardHolderName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                Nome inserido no cartão
                            </FormLabel>
                            <FormControl>
                                <Input {...field} aria-label="Nome inserido no cartão" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="cvc"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">CVC</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        aria-label="Código de segurança do cartão"
                                        inputMode="numeric"
                                        maxLength={3}
                                        placeholder="000"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expirationDate"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                    Vencimento
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        aria-label="Data de vencimento do cartão"
                                        inputMode="numeric"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        onChange={value => field.onChange(dateMask(value.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="cpf"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">CPF</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    aria-label="Documento CPF"
                                    inputMode="numeric"
                                    placeholder="000.000.000-00"
                                    maxLength={14}
                                    onChange={value => field.onChange(cpfMask(value.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button aria-label="Continuar" type="submit" variant="brand" loading={loading}>
                    Continuar
                </Button>
                <p className="text-center text-xs text-muted-foreground text-gray-500 mb-5">
                    Ao clicar em continuar, você concorda com nossos{' '}<br />
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary hover:text-gray-700"
                    >
                        Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary hover:text-gray-700"
                    >
                        Política de Privacidade
                    </Link>
                    .
                </p>
            </form>
        </Form>
    );
};

const formSchema = z.object({
    cardNumber: z
        .string({required_error: 'O campo número do cartão é obrigatório.'})
        .trim()
        .min(1, {message: 'Cartão inválido.'})
        .max(19, 'Cartão deve conter somente 16 números.'),
    cardHolderName: z
        .string({
            required_error: 'O campo nome inserido no cartão é obrigatório.',
        })
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    cvc: z
        .string({required_error: 'O campo CVC é obrigatório.'})
        .trim()
        .min(3, {message: 'CVC inválido.'})
        .max(3, 'CVC só pode conter 3 caracteres.'),
    expirationDate: z
        .string({required_error: 'O campo de vencimento é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'})
        .max(5, {
            message: 'Por favor, informe uma data no formato válido: MM/AA.',
        })
        .refine(
            value => /^\d{2}\/?\d{2}$/.test(value),
            'Por favor, informe uma data no formato válido: MM/AA.',
        ),
    cpf: z
        .string({required_error: 'O campo CPF é obrigatório.'})
        .refine(
            value => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(value),
            'Por favor, informe um CPF no formato válido.',
        )
        .refine(
            value => cpfValidator(value),
            'Por favor, informe um CPF válido.',
        ),
});
