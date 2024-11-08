import {InputHTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffixAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, type, suffixAddon, ...props}, ref) => (
        <div
            className={
                'flex align-center h-10 w-full overflow-auto rounded-md border'
                + ' border-neutral-200 bg-white focus-within:outline-none'
                + ' focus-within:ring-2 focus-within:ring-indigo-700'
                + ' focus-within:ring-offset-2 dark:border-neutral-800'
                + ' dark:bg-neutral-950 dark:ring-offset-neutral-950'
                + ' dark:focus-within:ring-neutral-300'
            }
        >
            <input
                {...props}
                type={type}
                ref={ref}
                className={
                    cn(
                        'flex h-full w-full px-3 py-2 text-sm ring-offset-white'
                        + ' file:border-0 file:bg-transparent file:text-sm'
                        + ' file:font-medium focus-visible:outline-none'
                        + ' placeholder:text-neutral-500 disabled:cursor-not-allowed'
                        + ' disabled:opacity-50 dark:placeholder:text-neutral-400',
                        className,
                    )
                }
            />
            {(suffixAddon ?? null) !== null && (
                <div className="flex items-center pr-4">{suffixAddon}</div>
            )}
        </div>
    ),
);
