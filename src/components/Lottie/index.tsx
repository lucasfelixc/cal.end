'use client';

import {FunctionComponent} from 'react';
import Lottie from 'react-lottie-player';

type LottieComponentProps = {
  animationData: object,
  style: {width: number, height: number},
};

export const LottieComponent: FunctionComponent<LottieComponentProps> = props => {
    const {animationData, style} = props;

    return (
        <Lottie loop={false} animationData={animationData} play style={style} />
    );
};
