import { FunctionComponent } from "react";
import { DonateValueForm } from "./DonateValueForm";
import type { Contractor } from "@/app/api/contractor/contractor";

type DonateValueStepProps = {
    contractorSlug: string;
    contractor: Contractor | null;
};

export const DonateValueStep: FunctionComponent<DonateValueStepProps> = ({
    contractorSlug,
    contractor,
}) => (
    <main className="flex flex-col mb-5 w-full">
        <DonateValueForm slug={contractorSlug} contractor={contractor} />
    </main>
);
