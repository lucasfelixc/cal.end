import {FunctionComponent} from 'react';
import {AlertCircle} from 'lucide-react';

export const PaymentErrorCard: FunctionComponent = () => (
    <div className="flex gap-4 items-start w-full rounded-lg bg-red-500/80 p-4 mb-5 text-gray-50 sm:items-center">
        <AlertCircle size={30} />
        Não conseguimos efetuar a cobrança no seu cartão.
    </div>
);
