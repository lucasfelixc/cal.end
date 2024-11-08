'use client';

import {FunctionComponent, useState} from 'react';
import {DonateValueForm} from './DonateValueForm';

type DonateValueStepProps = {params: {ngoSlug: string}};

export const DonateValueStep: FunctionComponent<DonateValueStepProps> = ({params}) => {
    const [isSubscription, setIsSubscription] = useState(true);

    return (
        <main className="flex flex-col mb-5 w-full">
            <h2 className="mb-3 text-center font-semibold text-lg text-gray-800 leading-7">
                Faça sua {isSubscription ? 'assinatura' : 'doação'}
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500 leading-6">
                Faça a {isSubscription ? 'assinatura' : 'doação'} do bem e ajude quem mais precisa!
            </p>
            <DonateValueForm
                slug={params.ngoSlug}
                isSubscription={isSubscription}
                setIsSubscription={setIsSubscription}
            />
        </main>
    );
};
