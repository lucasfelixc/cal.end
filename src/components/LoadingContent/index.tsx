import {FunctionComponent} from 'react';
import {Skeleton} from '../ui/Skeleton';

export const LoadingContent: FunctionComponent = () => (
    <div className="flex flex-col mb-5 w-full">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-full h-8" />
        </div>
        <div className="w-full flex items-center justify-between mb-12">
            <Skeleton className="w-24 h-24" />
            <Skeleton className="w-24 h-24" />
            <Skeleton className="w-24 h-24" />
        </div>
        <div className="flex flex-col items-center justify-center mb-6 gap-4">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-10" />
        </div>
        <div className="flex items-center justify-between mb-12">
            <Skeleton className="w-1/5 h-8" />
            <Skeleton className="w-3/4 h-8" />
        </div>
        <Skeleton className="w-full h-12" />
    </div>
);
