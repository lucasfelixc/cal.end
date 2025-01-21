'use client';

import {FunctionComponent} from 'react';
import {useRouter} from 'next/navigation';
import {useDonatorInfo} from '@/hooks/useDonatorInfo';
import {getValueWithTax, moneyFormatter} from '@/utils/convertValues';
import {Skeleton} from '@/components/ui/Skeleton';
import {Button} from '@/components/ui/Button';
import {Pencil} from 'lucide-react';

type PaymentCardDetailProps = {
    slug: string,
    hasEditButton?: boolean,
};

export const PaymentCardDetail: FunctionComponent<PaymentCardDetailProps> = props => {
    const {slug, hasEditButton = false} = props;
    const router = useRouter();
    const {donatorInfo} = useDonatorInfo();
    const isSubscription = donatorInfo?.payment?.recurring_payment_enabled ?? false;

    return (
        <div className="rounded-lg border-2 border-blue-600 flex justify-between px-4 py-3">
            <div className="flex flex-col">
                <p className="text-xs text-gray-600">
                    {isSubscription ? 'Valor da assinatura' : 'Valor da doação'}
                </p>
                {donatorInfo?.payment?.amount !== undefined
                    ? (
                        <p className="flex gap-1 items-baseline mt-2">
                            <span className="text-gray-800 text-2xl font-bold">
                                {moneyFormatter(
                                    donatorInfo.payment.include_taxes === true
                                        ? getValueWithTax(donatorInfo?.payment?.amount, 4)
                                        : donatorInfo?.payment?.amount,
                                )}
                            </span>
                            {isSubscription && <span className="text-xs text-gray-500">/mês</span>}
                        </p>
                    )
                    : (
                        <Skeleton className="w-full h-10 bg-neutral-200 my-2" />
                    )}
                <p className="text-blue-600 font-semibold text-sm">
                    Para tornar o mundo melhor
                </p>
            </div>
            {(hasEditButton ?? false) === true && (
                <Button
                    aria-label={`Alterar valor da ${isSubscription ? 'assinatura' : 'doação'}`}
                    variant="outline"
                    size="icon-sm"
                    onClick={() => router.push(`/${slug}`)}
                >
                    <Pencil size={16} className="text-gray-500" />
                </Button>
            )}
        </div>
    );
};
