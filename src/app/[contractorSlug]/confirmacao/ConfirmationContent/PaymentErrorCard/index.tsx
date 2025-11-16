import { FunctionComponent } from "react";
import { AlertCircle } from "lucide-react";
import { useScheduleInfo } from "@/hooks/useScheduleInfo";

export const PaymentErrorCard: FunctionComponent = () => {
    const { scheduleInfo } = useScheduleInfo();

    return (
        <div className="flex gap-4 items-start w-full rounded-lg bg-red-500/80 p-4 mb-5 text-gray-50 sm:items-center">
            <AlertCircle size={30} />
            Não conseguimos efetuar a cobrança
            {scheduleInfo?.paymentWay === "card" ? " no seu cartão" : ""}.
        </div>
    );
};
