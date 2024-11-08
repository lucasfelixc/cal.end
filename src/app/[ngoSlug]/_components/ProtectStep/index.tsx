'use client';

import {FunctionComponent, ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Donator, useDonatorInfo} from '@/hooks/useDonatorInfo';
import {LoadingContent} from '@/components/LoadingContent';

type ProtectStepProps = {
    requiredInfo: keyof Donator,
    slug: string,
    render: ReactElement,
};

export const ProtectStep: FunctionComponent<ProtectStepProps> = props => {
    const {requiredInfo, slug, render} = props;
    const router = useRouter();
    const {donatorInfo} = useDonatorInfo();
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            if ((donatorInfo?.[requiredInfo] ?? null) === null) {
                router.push(`/${slug}`);

                return;
            }

            setLoading(false);
        },
        [donatorInfo, requiredInfo, router, slug],
    );

    return loading
        ? (
            <div className="w-full h-full flex items-center justify-center">
                <LoadingContent />
            </div>
        )
        : (
            render
        );
};
