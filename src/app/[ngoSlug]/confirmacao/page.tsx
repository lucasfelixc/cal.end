import {FunctionComponent} from 'react';
import {ConfirmationContent} from './ConfirmationContent';

type ConfirmationProps = {params: {ngoSlug: string}};

const Confirmation: FunctionComponent<ConfirmationProps> = ({params}) => (
    <main className="flex flex-col w-full mb-5">
        <ConfirmationContent slug={params.ngoSlug} />
    </main>
);

export default Confirmation;
