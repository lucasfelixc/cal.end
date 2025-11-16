"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
    "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center" +
        " rounded-full border-2 border-transparent transition-colors" +
        " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700" +
        " focus-visible:ring-offset-2 focus-visible:ring-offset-white" +
        " disabled:cursor-not-allowed disabled:opacity-50" +
        " data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200" +
        " dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" +
        " dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800",
    {
        variants: {
            variant: {
                brand: "data-[state=checked]:bg-gradient-to-r from-blue-800 to-blue-600 ",
            },
        },
        defaultVariants: {
            variant: "brand",
        },
    }
);

export const Switch = forwardRef<
    ElementRef<typeof SwitchPrimitives.Root>,
    ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
        VariantProps<typeof switchVariants>
>(({ className, variant, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            switchVariants({ variant: variant, className: className })
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-white" +
                    " shadow-lg ring-0 transition-transform" +
                    " data-[state=checked]:translate-x-5" +
                    " data-[state=unchecked]:translate-x-0 dark:bg-slate-950"
            )}
        />
    </SwitchPrimitives.Root>
));
