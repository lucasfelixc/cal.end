"use server";

import { db } from "../../db/db";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const contractorSlug = url.searchParams.get("slug");

    if ((contractorSlug ?? null) === null) {
        throw new Error("Contractor slug is required.");
    }

    const contractor = db.contractors.find((c) => c.slug === contractorSlug);

    if (!contractor) {
        return new Response("Contractor not found.", { status: 404 });
    }

    return new Response(JSON.stringify(contractor), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
