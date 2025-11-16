"use client";

import { FunctionComponent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const StepButton: FunctionComponent = () => {
    const pathname = usePathname();
    const router = useRouter();
    const splittedPath = pathname.replace("/", "").split("/");
    const hasStepButton = getHasStepButton(splittedPath);

    return hasStepButton ? (
        <Button
            aria-label="Voltar para o passo anterior"
            onClick={() => router.push(getRouterBack(splittedPath))}
            variant="outline"
            size="icon"
            className={
                "flex items-center justify-center h-fit w-fit p-2 rounded-full" +
                " bg-gray-50/10 border-none" +
                " focus-visible:bg-gray-50/10 hover:bg-gray-50/10"
            }
        >
            <ChevronLeft className="text-gray-50" />
        </Button>
    ) : null;
};

const getHasStepButton = (paths: string[]): boolean => {
    const hasMultipleSteps = paths.length > 1;
    const isConfirmStep = paths.includes("sucesso");

    return hasMultipleSteps && isConfirmStep === false;
};

const getRouterBack = (paths: string[]): string => {
    switch (paths[1]) {
        case "dados-pessoais":
            return `/${paths[0]}`;
        case "endereco":
            return `/${paths[0]}/dados-pessoais`;
        case "forma-de-pagamento":
            return `/${paths[0]}/endereco`;
        case "pagamento":
            return `/${paths[0]}/forma-de-pagamento`;
        case "confirmacao":
            return `/${paths[0]}/forma-de-pagamento`;
        default:
            return `/${paths[0]}`;
    }
};
