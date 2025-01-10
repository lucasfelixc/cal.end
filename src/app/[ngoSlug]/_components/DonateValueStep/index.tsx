import {FunctionComponent} from 'react';
import {DonateValueForm} from './DonateValueForm';
import {NgoData} from '../../_ngoData';

type DonateValueStepProps = {ngoSlug: string, products: NgoData['products']};

export const DonateValueStep: FunctionComponent<DonateValueStepProps> = ({ngoSlug, products}) => (
    <main className="flex flex-col mb-5 w-full">
        <DonateValueForm
            slug={ngoSlug}
            products={products}
        />
    </main>
);
