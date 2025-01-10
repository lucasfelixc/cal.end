import {notFound} from 'next/navigation';

export type NgoData = {
    name: string,
    products: Array<{name: string, price: number}>,
};

export async function getNgoData(slug: string): Promise<NgoData | null> {
    if ((slug ?? null) === null) {
        return null;
    }

    const res = await fetch(
        `${process.env.HELPFLIX_BASE_URL}/functions/v1/organization?ngo_slug=${slug}`,
    );

    if (!res.ok) {
        return notFound();
    }

    return res.json();
}
