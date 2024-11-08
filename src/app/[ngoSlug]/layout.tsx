import {ReactElement} from 'react';
import {notFound} from 'next/navigation';
import {DonatorInfoProvider} from '@/hooks/useDonatorInfo';
import {WidgetLayout} from '@/layouts/WidgetLayout';

type NgoData = {
  name: string,
};

async function getNgoData(slug: string): Promise<NgoData | null> {
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

type RootLayoutProps = {
  children: React.ReactNode,
  params: {ngoSlug: string},
};

export const metadata = {
    title: 'Helpflix',
    description: 'Make the world a better place',
};

export default async function RootLayout(props: RootLayoutProps): Promise<ReactElement> {
    const {children, params} = props;
    const data = await getNgoData(params.ngoSlug);

    return (
        <div className="h-full">
            <DonatorInfoProvider>
                <WidgetLayout ongName={data?.name}>
                    {children}
                </WidgetLayout>
            </DonatorInfoProvider>
        </div>
    );
}
