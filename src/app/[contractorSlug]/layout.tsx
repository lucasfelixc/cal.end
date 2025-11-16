import { ReactElement } from "react";
import { ScheduleInfoProvider } from "@/hooks/useScheduleInfo";
import { WidgetLayout } from "@/layouts/WidgetLayout";
import { getContractorData } from "./_contractorData";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";

type RootLayoutProps = {
    children: React.ReactNode;
    params: { contractorSlug: string };
};

export const metadata = {
    title: "Calend",
    description: "Agende sem complicações",
};

export default async function RootLayout(
    props: RootLayoutProps
): Promise<ReactElement> {
    const { children, params } = props;
    const data = await getContractorData(params.contractorSlug);

    return (
        <div className="flex flex-col w-full flex-1">
            <ScheduleInfoProvider>
                <WidgetLayout
                    title={
                        <div className="w-full flex p-4 border border-gray-300 rounded-xl bg-gray-50">
                            <div className="w-full flex gap-3">
                                <Avatar>
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col items-start justify-between">
                                        <p className="text-sm font-medium text-gray-800">
                                            {data?.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {data?.specialty}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <Badge
                                            variant="outline"
                                            className="px-2"
                                        >
                                            <Star
                                                size={10}
                                                className="text-yellow-500 fill-yellow-500"
                                            />
                                            <span className="ml-1 text-xs font-normal">
                                                {data?.rating.toFixed(1) ??
                                                    "0.0"}
                                            </span>
                                        </Badge>
                                        <span className="text-xs font-normal text-slate-500">
                                            {data?.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    {children}
                </WidgetLayout>
            </ScheduleInfoProvider>
        </div>
    );
}
