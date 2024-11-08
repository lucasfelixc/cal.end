'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/Button';
import {FunctionComponent} from 'react';
import {WidgetLayout} from '@/layouts/WidgetLayout';

const NotFound: FunctionComponent = () => {
    const router = useRouter();

    return (
        <WidgetLayout ongName="404">
            <div className="flex-1 grid w-full place-items-center bg-white px-6 sm:pt-10 sm:pb-14 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-700">
                        Desculpe, mas...
                    </p>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-700">
                        Não encontramos a página que você procura
                    </h2>
                    <p className="mt-6 text-sm leading-7 text-gray-600">
                        Certifique-se de estar utilizando um link válido ou tente novamente.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button aria-label="Tentar novamente" variant="brand" onClick={() => router.refresh()}>
                            Tentar novamente
                        </Button>
                    </div>
                </div>
            </div>
        </WidgetLayout>
    );
};

export default NotFound;
