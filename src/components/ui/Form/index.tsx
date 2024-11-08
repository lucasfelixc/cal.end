'use client';

import {
    createContext,
    useContext,
    forwardRef,
    useId,
    HTMLAttributes,
    ElementRef,
    ComponentPropsWithoutRef,
    useMemo,
    ReactElement,
} from 'react';
import {
    Controller,
    ControllerProps,
    FieldError,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import {Slot} from '@radix-ui/react-slot';
import {cn} from '@/lib/utils';
import {Label} from '@/components/ui/Label';

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName,
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>): ReactElement => {
    const formFieldState = useMemo(() => ({name: props.name}), [props.name]);

    return (
        <FormFieldContext.Provider value={formFieldState}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

type UseFormField = {
    id: string,
    name: string,
    formItemId: string,
    formDescriptionId: string,
    formMessageId: string,
    invalid: boolean,
    isDirty: boolean,
    isTouched: boolean,
    error?: FieldError | undefined,
};

export const useFormField = (): UseFormField => {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const {getFieldState, formState} = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if ((fieldContext ?? null) === null) {
        throw new Error('useFormField should be used within <FormField>');
    }

    const {id} = itemContext;

    return {
        id: id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
  id: string,
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => {
        const id = useId();

        const formItemState = useMemo(() => ({id: id}), [id]);

        return (
            <FormItemContext.Provider value={formItemState}>
                <div ref={ref} className={cn('space-y-2', className)} {...props} />
            </FormItemContext.Provider>
        );
    },
);

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({className, ...props}, ref) => {
    const {error, formItemId} = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(error !== undefined && 'text-red-500 dark:text-red-900', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({...props}, ref) => {
    const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-invalid={error !== undefined}
            aria-describedby={
                error === undefined
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            {...props}
        />
    );
});

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => {
    const {formDescriptionId} = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={
                cn(
                    'text-sm text-neutral-500 dark:text-neutral-400',
                    className,
                )
            }
            {...props}
        />
    );
});

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({className, children, ...props}, ref) => {
    const {error, formMessageId} = useFormField();
    const body = error !== undefined ? String(error?.message) : children;

    if ((body ?? null) === null) {
        return null;
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={
                cn(
                    'text-sm font-normal text-error text-red-600 dark:text-red-900',
                    className,
                )
            }
            {...props}
        >
            {body}
        </p>
    );
});
