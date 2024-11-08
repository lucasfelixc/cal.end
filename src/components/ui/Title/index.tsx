import {FunctionComponent} from 'react';

type TitleProps = {
  title: string,
  className?: string,
};

export const Title: FunctionComponent<TitleProps> = ({title, className}) => (
    <h2 className={`text-2xl font-bold text-black text-center ${className}`}>
        {title}
    </h2>
);
