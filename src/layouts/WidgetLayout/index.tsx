import { Fragment, FunctionComponent, type ReactNode } from "react";
import { StepButton } from "@/components/StepButton";
import { Logo } from "@/components/Icons/Logo";
import { Skeleton } from "@/components/ui/Skeleton";

type WidgetLayoutProps = {
    title?: ReactNode;
    loading?: boolean;
    children: React.ReactNode;
};

export const WidgetLayout: FunctionComponent<WidgetLayoutProps> = (props) => {
    const { title, loading, children } = props;

    return (
        <div className="w-full flex-1 sm:flex sm:justify-center sm:py-6">
            <div className="w-full flex flex-col sm:w-128 relative">
                <header className="flex flex-col justify-center items-center gap-4 my-10 px-8 relative">
                    {loading === true ? (
                        <Skeleton className="w-full h-20" />
                    ) : (
                        <div className="w-full flex items-center gap-3">
                            <StepButton />
                            {title}
                        </div>
                    )}
                </header>
                <div className="h-full flex-1 flex flex-col items-center">
                    <div className="w-5/6 h-5 bg-white rounded-t-full opacity-25" />
                    <div
                        className={
                            "w-full flex-1 flex flex-col justify-between bg-white" +
                            " rounded-t-3xl items-center p-6 sm:h-auto sm:rounded-3xl"
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
