import {FunctionComponent} from 'react';
import {WidgetLayout} from '@/layouts/WidgetLayout';
import {LoadingContent} from '@/components/LoadingContent';

const Loading: FunctionComponent = () => (
    <WidgetLayout loading>
        <LoadingContent />
    </WidgetLayout>
);

export default Loading;
