import {FunctionComponent} from 'react';

type SubTitleProps = {
  subTitle: string,
  className?: string,
};

export const SubTitle: FunctionComponent<SubTitleProps> = ({subTitle, className}) => (
    <p className={`text-center text-gray-700 text-sm ${className}`}>
        {subTitle}
    </p>
);
