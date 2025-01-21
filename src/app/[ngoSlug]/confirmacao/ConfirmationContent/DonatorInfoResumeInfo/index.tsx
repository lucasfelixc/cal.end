/* eslint-disable jsx-a11y/label-has-associated-control -- This is not necessary */

'use client';

import {Dispatch, FunctionComponent, SetStateAction, useState} from 'react';
import dayjs from 'dayjs';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';
import {getValueWithTax, moneyFormatter} from '@/utils/convertValues';
import {Skeleton} from '@/components/ui/Skeleton';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/Button';
import {Switch} from '@/components/ui/Switch';
import {DetailCard} from './DetailCard';

type DonatorInfoResumeInfoProps = {
    slug: string,
    setHasError: Dispatch<SetStateAction<boolean>>,
};

export const DonatorInfoResumeInfo: FunctionComponent<DonatorInfoResumeInfoProps> = props => {
    const {slug, setHasError} = props;
    const router = useRouter();
    const {donatorInfo, setDonatorInfo} = useDonatorInfo();
    const [loading, setLoading] = useState(false);
    const [includeTaxes, setIncludeTaxes] = useState<boolean>(true);
    const isSubscription = donatorInfo?.payment?.recurring_payment_enabled ?? false;

    async function onSubmit(): Promise<void> {
        try {
            setLoading(true);
            setDonatorInfo(
                prev => ({
                    ...prev,
                    payment: {
                        ...prev?.payment,
                        include_taxes: includeTaxes,
                    },
                }),
            );

            const response = await fetch('/api/payment-checkout', {
                method: 'POST',
                body: JSON.stringify({
                    ...donatorInfo,
                    payment: {
                        ...donatorInfo?.payment,
                        amount: includeTaxes
                            ? getValueWithTax((donatorInfo?.payment?.amount ?? 0) * 100, 4)
                            : (donatorInfo?.payment?.amount ?? 0) * 100,
                    },
                    ...(donatorInfo?.paymentWay === 'card' && {
                        paymentMethodInfo: donatorInfo?.paymentMethodInfo,
                    }),
                }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            setLoading(false);
            setHasError(false);

            router.push(`/${slug}/sucesso`);
        } catch (e) {
            setLoading(false);
            setHasError(true);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <DetailCard
                title={`Doação ${isSubscription ? 'mensal' : 'única'}`}
                handleClickEditButton={() => router.push(`/${slug}`)}
                content={
                    donatorInfo?.payment?.amount !== undefined
                        ? (
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex items-end gap-1">
                                    <span className="text-gray-800 text-lg leading-5 font-bold">
                                        {moneyFormatter(
                                            includeTaxes
                                                ? getValueWithTax(donatorInfo?.payment?.amount, 4)
                                                : donatorInfo?.payment?.amount,
                                        )}
                                    </span>
                                    {isSubscription && <span className="text-xs text-gray-500">/mês</span>}
                                </div>
                                <div className="flex items-start gap-2">
                                    <Switch
                                        id="include_taxes"
                                        checked={includeTaxes}
                                        aria-label="Cobrir taxas administrativas da doação."
                                        onCheckedChange={setIncludeTaxes}
                                    />
                                    <label htmlFor="include_taxes" className="text-sm text-gray-700 !m-0">
                                        Cobrir taxas administrativas da doação.
                                    </label>
                                </div>
                            </div>
                        )
                        : (
                            <Skeleton className="w-full h-10 bg-neutral-200 my-2" />
                        )
                }
            />
            <DetailCard
                title="Dados pessoais"
                handleClickEditButton={() => router.push(`/${slug}/dados-pessoais`)}
                content={(
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500 text-sm">
                            {donatorInfo?.user?.firstname} {donatorInfo?.user?.lastname}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {dayjs(donatorInfo?.user?.birthday).format('DD/MM/YYYY')}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {donatorInfo?.user?.email} - {donatorInfo?.user?.phone}
                        </p>
                    </div>
                )}
            />
            <DetailCard
                title="Endereço"
                handleClickEditButton={() => router.push(`/${slug}/endereco`)}
                content={(
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500 text-sm">
                            {donatorInfo?.address?.street},
                            {' '}{donatorInfo?.address?.number}
                            {donatorInfo?.address?.complement !== undefined
                                        && ` - ${donatorInfo?.address?.complement}`}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {donatorInfo?.address?.neighborhood}
                            , {donatorInfo?.address?.city}
                            , {donatorInfo?.address?.state} - {donatorInfo?.address?.zipcode}
                        </p>
                    </div>
                )}
            />
            <DetailCard
                title="Forma de pagamento"
                handleClickEditButton={() => router.push(`/${slug}/forma-de-pagamento`)}
                content={(
                    <div className="flex flex-col gap-1">
                        {donatorInfo?.paymentWay === 'boleto'
                            ? (
                                <p className="text-gray-500 text-sm">Boleto</p>
                            )
                            : (
                                <p className="text-gray-500 text-sm">
                                    Cartão de crédito - **** {donatorInfo?.paymentMethodInfo
                                        ?.creditCard
                                        ?.cardNumber
                                        ?.slice(-4)}
                                </p>
                            )}
                    </div>
                )}
            />
            <Button aria-label="Confirmar doação" className="mt-4" variant="brand" onClick={onSubmit} loading={loading}>
                Confirmar doação
            </Button>
        </div>
    );
};
