'use client';

import {FocusEvent, FunctionComponent, useEffect, useState} from 'react';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/Form';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {useRouter} from 'next/navigation';

import {cepMask} from '@/lib/utils';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';

type TFormSchema = z.infer<typeof formSchema>;

type AddressDataFormProps = {slug: string};

export const AddressDataForm: FunctionComponent<AddressDataFormProps> = ({slug}) => {
    const router = useRouter();
    const [searchingAddress, setSearchingAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const {street, number, complement, neighborhood, city, state, zipcode} = donatorInfo?.address ?? {};
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            street: street,
            number: number,
            complement: complement,
            neighborhood: neighborhood,
            city: city,
            state: state,
            zipcode: cepMask(zipcode ?? null) ?? '',
        },
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);
        setDonatorInfo(
            prev => ({
                ...prev,
                address: {
                    ...values,
                    zipcode: values.zipcode.replaceAll(/[^0-9]+/g, ''),
                },
            }),
        );

        router.push(`/${slug}/forma-de-pagamento`);
    }

    const onSearchAddressData = async (
        data: FocusEvent<HTMLInputElement, Element>,
    ): Promise<void> => {
        if (
            (data.target.value ?? null) === null
      || data.target.value.length !== 9
        ) {
            return;
        }

        setSearchingAddress(true);

        const valueFormatted = data.target
            .value
            .replaceAll(/[^0-9]+/g, '');

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_VIA_CEP_BASE_URL}/${valueFormatted}/json`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        setSearchingAddress(false);

        if (!response.ok) {
            return;
        }

        const addressData = await response.json();

        form.setValue('street', addressData.logradouro);

        form.setValue('neighborhood', addressData.bairro);

        form.setValue('city', addressData.localidade);

        form.setValue('state', addressData.uf);
    };

    useEffect(() => () => setLoading(false), []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-5 flex-col"
            >
                <FormField
                    control={form.control}
                    name="zipcode"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">CEP</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    aria-label="CEP"
                                    inputMode="numeric"
                                    placeholder="00000-000"
                                    // @todo: implement loading behavior on input
                                    // loading={searchingAddress}
                                    onChange={value => field.onChange(cepMask(value.target.value))}
                                    onBlur={
                                        event => {
                                            field.onBlur();
                                            onSearchAddressData(event);
                                        }
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="street"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                Rua
                            </FormLabel>
                            <FormControl>
                                <Input {...field} aria-label="Rua" disabled={searchingAddress} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="number"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                    Número
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        inputMode="numeric"
                                        type="number"
                                        {...field}
                                        aria-label="Número do endereço"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="complement"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                    Complemento
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} aria-label="Complemento do endereço" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">Bairro</FormLabel>
                            <FormControl>
                                <Input {...field} aria-label="Bairro" disabled={searchingAddress} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                    Cidade
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} aria-label="Cidade" disabled={searchingAddress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                    Estado
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} aria-label="Estado" disabled={searchingAddress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="mb-5" type="submit" variant="brand" aria-label="Continuar" loading={loading}>
                    Continuar
                </Button>
            </form>
        </Form>
    );
};

const formSchema = z.object({
    zipcode: z
        .string({required_error: 'O campo CEP é obrigatório.'})
        .trim()
        .min(9, {message: 'O CEP deve conter 8 dígitos.'}),
    street: z
        .string({required_error: 'O campo rua é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    number: z
        .string({required_error: 'O campo número é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    complement: z.string()
        .trim()
        .optional(),
    neighborhood: z
        .string({required_error: 'O campo bairro é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    city: z
        .string({required_error: 'O campo cidade é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
    state: z
        .string({required_error: 'O campo estado é obrigatório.'})
        .trim()
        .min(1, {message: 'Este campo não pode ser vazio.'}),
});
