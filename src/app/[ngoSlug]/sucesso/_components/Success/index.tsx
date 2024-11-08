'use client';

import {FunctionComponent} from 'react';
import {Mail} from 'lucide-react';
import {LottieComponent} from '@/components/Lottie';
import checkSucces from '@/../public/lotties/checkSucces.json';
import {PaymentCardDetail} from '../../../_components/PaymentCardDetail';
import {ProtectStep} from '../../../_components/ProtectStep';
import {CtaDonateButton} from './CtaDonateButton';

type SuccessProps = {slug: string};

export const Success: FunctionComponent<SuccessProps> = ({slug}) => (
    <ProtectStep
        slug={slug}
        requiredInfo="paymentMethodInfo"
        render={(
            <main className="flex flex-col w-full h-full mb-5">
                <div className="w-full flex items-center justify-center mb-4">
                    <LottieComponent
                        animationData={checkSucces}
                        style={{height: 88, width: 88}}
                    />
                </div>
                <h2 className="mb-3 text-center font-semibold text-lg text-gray-800 leading-7">Deu tudo certo!</h2>
                <p className="mb-6 text-center text-sm text-gray-500 leading-6">
                    Agora você contribuiu!
                </p>
                <PaymentCardDetail slug={slug} />
                <div className="flex justify-center mt-8 mb-5">
                    <div
                        className={
                            'relative flex items-center justify-center p-3'
                        + ' text-gray-400 rounded-full border border-gray-300'
                        }
                    >
                        <span
                            className={
                                'animate-ping absolute inline-flex h-full w-full'
                            + ' rounded-full bg-gray-200 opacity-75'
                            }
                        />
                        <Mail size={25} />
                    </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                    Você irá receber um email com a confirmação de pagamento e o cadastro no site{' '}
                    <a
                        target="_blank"
                        href="https://donator.helpflix.com.br"
                        className="underline underline-offset-4 hover:text-primary hover:text-gray-700"
                    >
                        donator.helpflix.com.br
                    </a>
                    {' '}para gerenciar seus pagamentos.
                </p>
                <CtaDonateButton slug={slug} />
            </main>
        )}
    />
);
