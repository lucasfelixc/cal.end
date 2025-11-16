"use client";

import { FunctionComponent } from "react";
import { moneyFormatter } from "@/utils/convertValues";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Contractor } from "@/app/api/contractor/contractor";

type PaymentCardDetailProps = {
    slug: string;
    contractor: Contractor | null;
};

export const PaymentCardDetail: FunctionComponent<PaymentCardDetailProps> = (
    props
) => {
    const { contractor } = props;

    return (
        <div className="rounded-lg border-2 border-blue-600 flex justify-between px-4 py-3">
            <div className="flex flex-col">
                <p className="text-xs text-gray-600">Valor do serviço</p>
                {contractor?.price !== undefined ? (
                    <p className="flex gap-1 items-baseline mt-2">
                        <span className="text-gray-800 text-2xl font-bold">
                            {moneyFormatter(contractor?.price)}
                        </span>
                    </p>
                ) : (
                    <Skeleton className="w-full h-10 bg-neutral-200 my-2" />
                )}
            </div>
        </div>
    );
};
