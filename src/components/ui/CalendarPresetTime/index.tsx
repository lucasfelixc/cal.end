"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

type CalendarPresetValue = {
    date?: Date;
    time?: string;
};

export function CalendarPresetTime({
    value,
    onChange,
}: {
    value?: CalendarPresetValue;
    onChange: (val: CalendarPresetValue) => void;
}) {
    const date = value?.date;
    const selectedTime = value?.time ?? null;

    function setDate(d?: Date) {
        onChange({ date: d, time: selectedTime ?? "" });
    }

    function setSelectedTime(t: string) {
        onChange({ date, time: t });
    }

    const timeSlots = Array.from({ length: 5 }, (_, i) => {
        const totalMinutes = i * 120;
        const hour = Math.floor(totalMinutes / 60) + 9;
        const minute = totalMinutes % 60;
        return `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
    });

    const bookedDates = Array.from(
        { length: 3 },
        (_, i) => new Date(2025, 5, 17 + i)
    );

    return (
        <Card className="gap-0 p-0">
            <CardContent className="relative p-0 md:pr-48">
                <div className="p-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date ?? new Date()}
                        disabled={bookedDates}
                        showOutsideDays={false}
                        modifiers={{ booked: bookedDates }}
                        modifiersClassNames={{
                            booked: "[&>button]:line-through opacity-100",
                        }}
                        className="w-full bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                        formatters={{
                            formatWeekdayName: (d) => {
                                const weekday = d
                                    .toLocaleString("pt-BR", {
                                        weekday: "short",
                                    })
                                    .replace(".", "");
                                return (
                                    weekday.charAt(0).toUpperCase() +
                                    weekday.slice(1)
                                );
                            },
                        }}
                    />
                </div>
                <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
                    <div className="grid gap-2">
                        {timeSlots.map((time) => (
                            <Button
                                key={time}
                                variant={
                                    selectedTime === time
                                        ? "default"
                                        : "outline"
                                }
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className="w-full shadow-none"
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
                <div className="text-sm">
                    {date && selectedTime ? (
                        <>
                            Seu serviço será agendado para{" "}
                            <span className="font-medium">
                                {date.toLocaleDateString("pt-BR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </span>{" "}
                            às{" "}
                            <span className="font-medium">{selectedTime}</span>.
                        </>
                    ) : (
                        <>Selecione a data e horário para o serviço.</>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
