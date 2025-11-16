"use client";

import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Schedule, useScheduleInfo } from "@/hooks/useScheduleInfo";
import { LoadingContent } from "@/components/LoadingContent";

type ProtectStepProps = {
    requiredInfo: keyof Schedule;
    slug: string;
    render: ReactElement;
};

export const ProtectStep: FunctionComponent<ProtectStepProps> = (props) => {
    const { requiredInfo, slug, render } = props;
    const router = useRouter();
    const { scheduleInfo } = useScheduleInfo();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ((scheduleInfo?.[requiredInfo] ?? null) === null) {
            router.push(`/${slug}`);

            return;
        }

        setLoading(false);
    }, [scheduleInfo, requiredInfo, router, slug]);

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <LoadingContent />
        </div>
    ) : (
        render
    );
};
