"use client";

import { Fragment, FunctionComponent, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useScheduleInfo } from "@/hooks/useScheduleInfo";
import { useRouter } from "next/navigation";
import { ProtectStep } from "../_components/ProtectStep";
import { PaymentWayCard } from "./PaymentWayCard";

type PaymentWayProps = { params: { contractorSlug: string } };

const PaymentWay: FunctionComponent<PaymentWayProps> = ({ params }) => {
    const router = useRouter();
    const { setScheduleInfo } = useScheduleInfo();
    const [loading, setLoading] = useState(false);
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);

        setScheduleInfo((prev) => ({
            ...prev,
            paymentWay: values.paymentWay,
        }));

        if (values.paymentWay === "pix") {
            return router.push(`/${params.contractorSlug}/confirmacao`);
        }

        router.push(`/${params.contractorSlug}/pagamento`);
    }

    return (
        <main className="flex flex-col w-full mb-5">
            <ProtectStep
                slug={params.contractorSlug}
                requiredInfo="address"
                render={
                    <Fragment>
                        <h2 className="my-5 text-center font-semibold text-lg text-gray-800 leading-7">
                            Forma de pagamento
                        </h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="paymentWay"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col mb-4">
                                            <RadioGroup
                                                aria-label="Forma de pagamento"
                                                className="flex flex-col gap-5 justify-center"
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormItem>
                                                    <PaymentWayCard
                                                        isSelected={
                                                            field.value ===
                                                            "card"
                                                        }
                                                        value="card"
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <PaymentWayCard
                                                        isSelected={
                                                            field.value ===
                                                            "pix"
                                                        }
                                                        value="pix"
                                                    />
                                                </FormItem>
                                            </RadioGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    aria-label="Continuar"
                                    className="mb-5 w-full"
                                    type="submit"
                                    variant="brand"
                                    loading={loading}
                                >
                                    Continuar
                                </Button>
                            </form>
                        </Form>
                    </Fragment>
                }
            />
        </main>
    );
};

type TFormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
    paymentWay: z.enum(["card", "pix"], {
        required_error: "Selecione uma forma de pagamento",
    }),
});

export default PaymentWay;
