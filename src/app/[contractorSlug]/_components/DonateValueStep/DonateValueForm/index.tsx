/* eslint-disable camelcase -- @todo update recurring_payment_enabled data to camel case */

"use client";

import { Fragment, FunctionComponent, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useScheduleInfo } from "@/hooks/useScheduleInfo";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import type { Contractor } from "@/app/api/contractor/contractor";
import { CalendarPresetTime } from "@/components/ui/CalendarPresetTime";

const formSchema = z.object({
    schedule: z
        .object({
            date: z.date({ required_error: "Selecione uma data." }),
            time: z
                .string({ required_error: "Selecione um horário." })
                .min(1, "Selecione um horário."),
        })
        .partial()
        .refine((v) => v.date instanceof Date && !!v.time, {
            message: "Selecione data e horário.",
            path: ["time"],
        }),
});

type TFormSchema = z.infer<typeof formSchema>;

type DonateValueFormProps = {
    slug: string;
    contractor: Contractor | null;
};

export const DonateValueForm: FunctionComponent<DonateValueFormProps> = (
    props: DonateValueFormProps
) => {
    const { slug, contractor } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { scheduleInfo, setScheduleInfo } = useScheduleInfo();
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            schedule: { date: undefined, time: "" },
        },
    });

    function onSubmit(values: TFormSchema): void {
        setLoading(true);
        const { schedule } = values;

        setScheduleInfo((prev) => ({
            ...prev,
            service: {
                date: schedule?.date?.toISOString(),
                time: schedule?.time,
            },
        }));

        router.push(`/${slug}/dados-pessoais`);
    }

    useEffect(() => () => setLoading(false), []);

    return (
        <Fragment>
            <h2 className="mb-3 font-semibold text-lg text-gray-800 leading-7">
                Agende seu atendimento
            </h2>
            <p className="mb-8 text-sm text-gray-500 leading-6">
                Selecione o melhor dia e horário com base na agenda de{" "}
                {contractor?.name}.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="schedule"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CalendarPresetTime
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        aria-label="Continuar"
                        className="mt-10 mb-5 w-full"
                        type="submit"
                        variant="brand"
                        loading={loading}
                    >
                        Continuar
                    </Button>
                </form>
            </Form>
        </Fragment>
    );
};
