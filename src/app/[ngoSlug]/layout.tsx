import {ReactElement} from 'react';
import {DonatorInfoProvider} from '@/hooks/useDonatorInfo';
import {WidgetLayout} from '@/layouts/WidgetLayout';
import {getNgoData} from './_ngoData';

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
