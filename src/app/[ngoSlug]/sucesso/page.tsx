import {FunctionComponent} from 'react';
import {Success as SuccessStep} from './_components/Success';

type SuccessProps = {params: {ngoSlug: string}};

const Success: FunctionComponent<SuccessProps> = ({params}) => (
    <main className="flex flex-col w-full mb-5">
        <SuccessStep slug={params.ngoSlug} />
    </main>
);

export default Success;
