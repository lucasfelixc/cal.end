'use client';

import {Fragment, FunctionComponent, useState} from 'react';
import {PaymentCardDetail} from '@/app/[ngoSlug]/_components/PaymentCardDetail';
import {ProtectStep} from '@/app/[ngoSlug]/_components/ProtectStep';
import {PaymentErrorCard} from './PaymentErrorCard';
import {PaymentForm} from './PaymentForm';

type CheckoutProps = {slug: string};

export const Checkout: FunctionComponent<CheckoutProps> = ({slug}) => {
    const [hasError, setHasError] = useState(false);

    return (
        <ProtectStep
            slug={slug}
            requiredInfo="address"
            render={(
                <Fragment>
                    {hasError && <PaymentErrorCard />}
                    <PaymentCardDetail hasEditButton slug={slug} />
                    <h2 className="my-5 text-center font-semibold text-lg text-gray-800 leading-7">
                        Dados de pagamento
                    </h2>
                    <PaymentForm slug={slug} setHasError={setHasError} />
                </Fragment>
            )}
        />
    );
};
