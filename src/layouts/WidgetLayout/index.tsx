import {FunctionComponent} from 'react';
import {StepButton} from '@/components/StepButton';
import {Logo} from '@/components/Icons/Logo';
import {Skeleton} from '@/components/ui/Skeleton';

type WidgetLayoutProps = {
  ongName?: string,
  loading?: boolean,
  children: React.ReactNode,
};

export const WidgetLayout: FunctionComponent<WidgetLayoutProps> = props => {
    const {ongName, loading, children} = props;
    const title = loading === true ? <Skeleton className="w-40 h-8" /> : (ongName ?? '');

    return (
        <div
            className={
                'w-full h-screen min-h-full bg-gradient-to-b'
                        + ' from-secondary-800  to-secondary-400 to-20%'
                        + ' sm:flex sm:justify-center overflow-y-auto sm:py-6 sm:h-auto'
            }
        >
            <div className="w-full h-full flex flex-col sm:w-128">
                <header className="flex flex-col justify-center items-center gap-4 my-10 relative">
                    {loading !== true && <StepButton />}
                    <h1 className="text-2xl text-white font-bold">
                        {title}
                    </h1>
                </header>
                <div className="h-full flex-1 flex flex-col items-center">
                    <div className="w-5/6 h-5 bg-white rounded-t-full opacity-25" />
                    <div
                        className={
                            'w-full h-full flex flex-col justify-between bg-white'
                                    + ' rounded-t-3xl items-center p-6 sm:h-auto sm:rounded-3xl'
                        }
                    >
                        {children}
                        <Logo />
                    </div>
                </div>
            </div>
        </div>
    );
};
