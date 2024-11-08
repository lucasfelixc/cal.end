'use client';

import {FunctionComponent} from 'react';
import {Button} from '@/components/ui/Button';
import {useRouter} from 'next/navigation';

type CtaDonateButtonProps = {
    slug: string,
};

export const CtaDonateButton: FunctionComponent<CtaDonateButtonProps> = ({slug}) => {
    const router = useRouter();

    return (
        <Button
            aria-label="Doar novamente"
            variant="outline"
            className="my-4 text-gray-700"
            onClick={() => router.push(`/${slug}`)}
        >
            Doar novamente
        </Button>
    );
};
