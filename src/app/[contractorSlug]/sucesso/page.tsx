import { FunctionComponent, type ReactElement } from "react";
import { Success as SuccessStep } from "./_components/Success";
import { getContractorData } from "../_contractorData";

type SuccessProps = { params: { contractorSlug: string } };

async function Success({ params }: SuccessProps): Promise<ReactElement> {
    const data = await getContractorData(params.contractorSlug);

    return (
        <main className="flex flex-col w-full mb-5">
            <SuccessStep slug={params.contractorSlug} contractor={data} />
        </main>
    );
}

export default Success;
