import {cn} from '@/lib/utils';
import {FunctionComponent} from 'react';

export const Skeleton: FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = props => {
    const {className, ...rest} = props;

    return (
        <div
            className={cn('animate-pulse rounded-md bg-gray-400/40 dark:bg-slate-800', className)}
            {...rest}
        />
    );
};
