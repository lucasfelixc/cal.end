import { type ReactElement } from "react";
import { ConfirmationContent } from "./ConfirmationContent";
import { getContractorData } from "../_contractorData";

type ConfirmationProps = { params: { contractorSlug: string } };

async function Confirmation({
    params,
}: ConfirmationProps): Promise<ReactElement> {
    const data = await getContractorData(params.contractorSlug);

    return (
        <main className="flex flex-col w-full mb-5">
            <ConfirmationContent
                slug={params.contractorSlug}
                contractor={data}
            />
        </main>
    );
}

export default Confirmation;
