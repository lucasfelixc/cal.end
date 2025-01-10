'use client';

import {Fragment, FunctionComponent, useState} from 'react';
import {ProtectStep} from '@/app/[ngoSlug]/_components/ProtectStep';
import {DonatorInfoResumeInfo} from './DonatorInfoResumeInfo';
import {PaymentErrorCard} from './PaymentErrorCard';

type ConfirmationContentProps = {slug: string};

export const ConfirmationContent: FunctionComponent<ConfirmationContentProps> = ({slug}) => {
    const [hasPaymentError, setHasPaymentError] = useState(false);

    return (
        <ProtectStep
            slug={slug}
            requiredInfo="paymentWay"
            render={(
                <Fragment>
                    <h2 className="my-5 text-center font-semibold text-lg text-gray-800 leading-7">
                        Revise e confirme sua doação
                    </h2>
                    {hasPaymentError && <PaymentErrorCard />}
                    <DonatorInfoResumeInfo slug={slug} setHasError={setHasPaymentError} />
                </Fragment>
            )}
        />
    );
};
