'use client';

import {ErrorHandling} from '@/components/ErrorHandling';
import {FunctionComponent} from 'react';

type ErrorProps = {
  reset: () => void,
};

const Error: FunctionComponent<ErrorProps> = ({reset}) => <ErrorHandling reset={reset} />;

export default Error;
