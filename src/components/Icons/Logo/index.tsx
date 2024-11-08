import {FunctionComponent} from 'react';
import {HeartBrand} from './HeartBrand';
import {TitleBrand} from './TitleBrand';

export const Logo: FunctionComponent = () => (
    <div role="img" aria-label="Logo da helpflix" className="flex items-center gap-2">
        <HeartBrand />
        <TitleBrand />
    </div>
);
