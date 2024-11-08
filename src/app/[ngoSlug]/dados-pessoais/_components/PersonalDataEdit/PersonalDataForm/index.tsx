'use client';

import {FunctionComponent, useEffect, useState} from 'react';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {phoneMask} from '@/lib/utils';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/Form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/Select';
import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';

type TFormSchema = z.infer<typeof formSchema>;

type PersonalDataFormProps = {slug: string};

export const PersonalDataForm: FunctionComponent<PersonalDataFormProps> = ({slug}) => {
    const router = useRouter();
    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const [loading, setLoading] = useState(false);
    const {firstname, lastname, phone, email, birthday} = donatorInfo?.user ?? {};
    const birthdaySplited = birthday?.split('-') ?? [];

    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: firstname,
            lastname: lastname,
            phone: phoneMask(phone ?? null) ?? '',
            email: email,
            birthday: birthdaySplited[2] ?? '',
            birthmonth: birthdaySplited[1] ?? '',
            birthyear: birthdaySplited[0] ?? '',
        },
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);
        setDonatorInfo(
            prev => ({
                ...prev,
                user: {
                    ...prev?.user,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    birthday: `${values.birthyear}-${values.birthmonth}-${values.birthday}`,
                    phone: values.phone.replaceAll(/[^0-9]+/g, ''),
                },
            }),
        );

        router.push(`/${slug}/endereco`);
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
                    name="firstname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">Nome</FormLabel>
                            <FormControl>
                                <Input aria-label="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                Sobrenome
                            </FormLabel>
                            <FormControl>
                                <Input aria-label="Sobrenome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">
                                Telefone
                            </FormLabel>
                            <FormControl>
                                <Input
                                    aria-label="Telefone"
                                    inputMode="numeric"
                                    placeholder="(00) 00000-0000"
                                    {...field}
                                    onChange={value => field.onChange(phoneMask(value.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-700">Email</FormLabel>
                            <FormControl>
                                <Input aria-label="Email" placeholder="email@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-700" htmlFor="birthday">
                        Data de nascimento
                    </FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                aria-label="Dia do nascimento"
                                                maxLength={2}
                                                placeholder="Dia"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="birthmonth"
                                render={({field}) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    aria-label="Mês do nascimento"
                                                    className="text-slate-900"
                                                >
                                                    <SelectValue placeholder="Mês" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="text-slate-900">
                                                <SelectItem aria-label="Janeiro" value="01">Janeiro</SelectItem>
                                                <SelectItem aria-label="Fevereiro" value="02">Fevereiro</SelectItem>
                                                <SelectItem aria-label="Março" value="03">Março</SelectItem>
                                                <SelectItem aria-label="Abril" value="04">Abril</SelectItem>
                                                <SelectItem aria-label="Maio" value="05">Maio</SelectItem>
                                                <SelectItem aria-label="Junho" value="06">Junho</SelectItem>
                                                <SelectItem aria-label="Julho" value="07">Julho</SelectItem>
                                                <SelectItem aria-label="Agosto" value="08">Agosto</SelectItem>
                                                <SelectItem aria-label="Setembro" value="09">Setembro</SelectItem>
                                                <SelectItem aria-label="Outubro" value="10">Outubro</SelectItem>
                                                <SelectItem aria-label="Novembro" value="11">Novembro</SelectItem>
                                                <SelectItem aria-label="Dezembro" value="12">Dezembro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="birthyear"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                aria-label="Ano do nascimento"
                                                maxLength={4}
                                                placeholder="Ano"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <Button aria-label="Continuar" className="mb-5" type="submit" variant="brand" loading={loading}>
                    Continuar
                </Button>
            </form>
        </Form>
    );
};

const formSchema = z.object({
    firstname: z
        .string({required_error: 'O campo nome é obrigatório.'})
        .trim()
        .min(3, {message: 'O tamanho mínimo do nome é de 3 caracteres.'}),
    lastname: z
        .string({required_error: 'O campo sobrenome é obrigatório.'})
        .trim()
        .min(3, {message: 'O tamanho mínimo do sobrenome é de 3 caracteres.'}),
    phone: z
        .string({required_error: 'O campo telefone é obrigatório.'})
        .trim()
        .min(15, {message: 'O tamanho mínimo do telefone é de 11 caracteres.'})
        .max(15, {message: 'O tamanho máximo do telefone é de 11 caracteres.'}),
    email: z
        .string({required_error: 'O campo de email é obrigatório.'})
        .trim()
        .min(3, {
            message: 'O tamanho mínimo do email é de 3 caracteres.',
        })
        .max(40, {
            message: 'O tamanho máximo do email é de 40 caracteres.',
        })
        .email({
            message: 'Por favor, informe um email válido.',
        }),
    birthday: z
        .string({required_error: 'O campo dia de nascimento é obrigatório.'})
        .trim()
        .min(1, {message: 'O campo dia de nascimento não pode ser vazio.'}),
    birthmonth: z
        .string({
            required_error: 'O campo mês de nascimento é obrigatório.',
        })
        .trim()
        .min(1, {message: 'O campo mês de nascimento não pode ser vazio.'}),
    birthyear: z
        .string({
            required_error: 'O campo ano de nascimento é obrigatório.',
        })
        .trim()
        .min(1, {message: 'O campo ano de nascimento não pode ser vazio.'}),
});
