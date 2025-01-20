'use client';

import {Fragment, FunctionComponent} from 'react';
import {ProtectStep} from '@/app/[ngoSlug]/_components/ProtectStep';
import {CreditCardForm} from './CreditCardForm';

type CheckoutProps = {slug: string};

export const Checkout: FunctionComponent<CheckoutProps> = ({slug}) => (
    <ProtectStep
        slug={slug}
        requiredInfo="paymentWay"
        render={(
            <Fragment>
                <h2 className="my-5 text-center font-semibold text-lg text-gray-800 leading-7">
                    Dados de pagamento
                </h2>
                <CreditCardForm slug={slug} />
            </Fragment>
        )}
    />
);
