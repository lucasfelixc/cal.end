'use client';

import {FunctionComponent, ReactNode} from 'react';
import {Button} from '@/components/ui/Button';
import {Pencil} from 'lucide-react';

type DetailCardProps = {
    title: string,
    handleClickEditButton: () => void,
    content: ReactNode,
};

export const DetailCard: FunctionComponent<DetailCardProps> = props => {
    const {title, handleClickEditButton, content} = props;

    return (
        <div className="rounded-lg border border-slate-300 flex flex-col justify-between">
            <div className="w-full flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-300">
                <p className="text-sm font-medium text-gray-800">
                    {title}
                </p>
                <Button
                    aria-label="Editar informação"
                    variant="outline"
                    size="icon-sm"
                    onClick={handleClickEditButton}
                    className="border-blue-500"
                >
                    <Pencil size={16} className="text-blue-500" />
                </Button>
            </div>
            <div className="px-4 pb-3 pt-2">
                {content}
            </div>
        </div>
    );
};
