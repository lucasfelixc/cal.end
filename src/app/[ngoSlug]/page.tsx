import {ReactElement} from 'react';
import {DonateValueStep} from './_components/DonateValueStep';
import {getNgoData} from './_ngoData';

type HomeProps = {params: {ngoSlug: string}};

export default async function Home({params}: HomeProps): Promise<ReactElement> {
    const data = await getNgoData(params.ngoSlug);

    return (
        <DonateValueStep ngoSlug={params.ngoSlug} products={data?.products ?? []} />
    );
}
