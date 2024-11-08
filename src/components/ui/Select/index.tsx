'use client';

import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {Check, ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';

export const Select = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(
    ({className, children, ...props}, ref) => (
        <SelectPrimitive.Trigger
            ref={ref}
            className={
                cn(
                    'flex h-10 w-full overflow-hidden items-center justify-between'
                    + ' rounded-md border border-neutral-200 bg-white px-3 py-2'
                    + ' text-sm ring-offset-white placeholder:text-neutral-500'
                    + ' focus:outline-none focus:ring-2 focus:ring-indigo-700'
                    + ' focus:ring-offset-1 disabled:cursor-not-allowed'
                    + ' disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950'
                    + ' dark:ring-offset-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-400',
                    className,
                )
            }
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    ),
);

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
    ({className, children, position = 'popper', ...props}, ref) => (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                ref={ref}
                position={position}
                className={
                    cn(
                        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border'
                        + ' border-neutral-200 bg-white text-neutral-950'
                        + ' shadow-md data-[state=open]:animate-in'
                        + ' data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
                        + ' data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95'
                        + ' data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2'
                        + ' data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2'
                        + ' data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800'
                        + ' dark:bg-neutral-950 dark:text-neutral-50',

                        position === 'popper' && 'data-[side=bottom]:translate-y-1'
                        + ' data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1'
                        + ' data-[side=top]:-translate-y-1',

                        className,
                    )
                }
                {...props}
            >
                <SelectPrimitive.Viewport
                    className={
                        cn(
                            'p-1',
                            position === 'popper'
            && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                        )
                    }
                >
                    {children}
                </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    ),
);

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(
    ({className, ...props}, ref) => (
        <SelectPrimitive.Label
            ref={ref}
            className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
            {...props}
        />
    ),
);

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(
    ({className, children, ...props}, ref) => (
        <SelectPrimitive.Item
            ref={ref}
            className={
                cn(
                    'relative flex w-full cursor-default select-none items-center'
                    + ' rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none'
                    + ' focus:bg-neutral-100 focus:text-neutral-900'
                    + ' data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                    + ' dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
                    className,
                )
            }
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    ),
);

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(
    ({className, ...props}, ref) => (
        <SelectPrimitive.Separator
            ref={ref}
            className={
                cn(
                    '-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800',
                    className,
                )
            }
            {...props}
        />
    ),
);
