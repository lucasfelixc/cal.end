/* eslint-disable jsx-a11y/label-has-associated-control -- This is not necessary */

"use client";

import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useScheduleInfo } from "@/hooks/useScheduleInfo";
import { getValueWithTax, moneyFormatter } from "@/utils/convertValues";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { DetailCard } from "./DetailCard";
import type { Contractor } from "@/app/api/contractor/contractor";

type DonatorInfoResumeInfoProps = {
    slug: string;
    contractor: Contractor | null;
    setHasError: Dispatch<SetStateAction<boolean>>;
};

export const DonatorInfoResumeInfo: FunctionComponent<
    DonatorInfoResumeInfoProps
> = (props) => {
    const { slug, contractor, setHasError } = props;
    const router = useRouter();
    const { scheduleInfo } = useScheduleInfo();
    const [loading, setLoading] = useState(false);

    async function onSubmit(): Promise<void> {
        try {
            setLoading(true);

            setTimeout(() => {}, 2000);

            setLoading(false);
            setHasError(false);

            router.push(`/${slug}/sucesso`);
        } catch (e) {
            setLoading(false);
            setHasError(true);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <DetailCard
                title="Serviço"
                handleClickEditButton={() => router.push(`/${slug}`)}
                content={
                    contractor?.price !== undefined ? (
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-end gap-1">
                                <span className="text-gray-800 text-lg leading-5 font-bold">
                                    {moneyFormatter(contractor?.price)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Skeleton className="w-full h-10 bg-neutral-200 my-2" />
                    )
                }
            />
            <DetailCard
                title="Dados pessoais"
                handleClickEditButton={() =>
                    router.push(`/${slug}/dados-pessoais`)
                }
                content={
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500 text-sm">
                            {scheduleInfo?.user?.firstname}{" "}
                            {scheduleInfo?.user?.lastname}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {dayjs(scheduleInfo?.user?.birthday).format(
                                "DD/MM/YYYY"
                            )}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {scheduleInfo?.user?.email} -{" "}
                            {scheduleInfo?.user?.phone}
                        </p>
                    </div>
                }
            />
            <DetailCard
                title="Endereço"
                handleClickEditButton={() => router.push(`/${slug}/endereco`)}
                content={
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500 text-sm">
                            {scheduleInfo?.address?.street},{" "}
                            {scheduleInfo?.address?.number}
                            {scheduleInfo?.address?.complement !== undefined &&
                                ` - ${scheduleInfo?.address?.complement}`}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {scheduleInfo?.address?.neighborhood},{" "}
                            {scheduleInfo?.address?.city},{" "}
                            {scheduleInfo?.address?.state} -{" "}
                            {scheduleInfo?.address?.zipcode}
                        </p>
                    </div>
                }
            />
            <DetailCard
                title="Forma de pagamento"
                handleClickEditButton={() =>
                    router.push(`/${slug}/forma-de-pagamento`)
                }
                content={
                    <div className="flex flex-col gap-1">
                        {scheduleInfo?.paymentWay === "pix" ? (
                            <p className="text-gray-500 text-sm">Pix</p>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                Cartão de crédito - ****{" "}
                                {scheduleInfo?.paymentMethodInfo?.creditCard?.cardNumber?.slice(
                                    -4
                                )}
                            </p>
                        )}
                    </div>
                }
            />
            <Button
                aria-label="Confirmar contratação de serviço"
                className="mt-4"
                variant="brand"
                onClick={onSubmit}
                loading={loading}
            >
                Confirmar contratação de serviço
            </Button>
        </div>
    );
};
