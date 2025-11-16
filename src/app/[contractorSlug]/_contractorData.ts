import { notFound } from "next/navigation";
import type { Contractor } from "../api/contractor/contractor";
import { db } from "../api/db/db";

export async function getContractorData(
    contractorSlug: string
): Promise<Contractor | null> {
    if ((contractorSlug ?? null) === null) {
        throw new Error("Contractor slug is required.");
    }

    const contractor = db.contractors.find((c) => c.slug === contractorSlug);

    if (!contractor) {
        return notFound();
    }

    return contractor;
}
