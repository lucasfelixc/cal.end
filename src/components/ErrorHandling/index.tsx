'use client';

import {FunctionComponent} from 'react';
import {Button} from '@/components/ui/Button';

type ErrorHandlingProps = {
  reset: () => void,
};

export const ErrorHandling: FunctionComponent<ErrorHandlingProps> = ({reset}) => (
    <div className="grid w-full min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
            <p className="text-base font-semibold text-indigo-700">
                Desculpe, mas...
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-700">
                Algo deu errado
            </h1>
            <p className="mt-6 text-sm leading-7 text-gray-600">
                Houve um problema ao carregar a página. Por favor, tente atualizar a
                página novamente.
            </p>
            <Button aria-label="Tentar novamente" className="mt-10" variant="brand" onClick={reset}>
                Tentar novamente
            </Button>
        </div>
    </div>
);
