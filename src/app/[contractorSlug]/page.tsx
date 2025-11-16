import { ReactElement } from "react";
import { DonateValueStep } from "./_components/DonateValueStep";
import { getContractorData } from "./_contractorData";

type HomeProps = { params: { contractorSlug: string } };

export default async function Home({
    params,
}: HomeProps): Promise<ReactElement> {
    const data = await getContractorData(params.contractorSlug);

    return (
        <DonateValueStep
            contractorSlug={params.contractorSlug}
            contractor={data}
        />
    );
}
