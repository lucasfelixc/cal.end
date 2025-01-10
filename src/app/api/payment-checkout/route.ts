'use server';

import {DonatorInfo} from '@/hooks/useDonatorInfo';
import {Stripe} from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY ?? '');

export async function POST(request: Request): Promise<Response> {
    const {
        user,
        address,
        payment,
        paymentMethodInfo,
        paymentWay,
    } = await request.json() as DeepPartial<DonatorInfo>;

    if (user === undefined || address === undefined || payment === undefined) {
        throw new Error('Missing required information.');
    }

    let paymentMethod: Stripe.Response<Stripe.PaymentMethod> | undefined;

    if (paymentWay === 'card') {
        const paymentParams: Stripe.PaymentMethodCreateParams = {
            type: 'card',
            card: {
                number: paymentMethodInfo?.creditCard?.cardNumber ?? '',
                cvc: paymentMethodInfo?.creditCard?.cvc,
                exp_month: parseInt(paymentMethodInfo?.creditCard?.exp_month ?? '', 10),
                exp_year: parseInt(paymentMethodInfo?.creditCard?.exp_year ?? '', 10),
            },
        };

        paymentMethod = await stripe.paymentMethods.create(paymentParams);
    }

    if (paymentMethod !== undefined && !('id' in paymentMethod)) {
        throw new Error('Failed to create the payment method.');
    }

    const {cpf: userCpf, ...userData} = user;

    const payload = {
        user: userData,
        address: address,
        payment: {
            ...payment,
            payment_type: paymentWay,
            ...(paymentWay === 'card' && paymentMethod !== undefined && {
                payment_method_id: paymentMethod.id,
                document: paymentMethodInfo?.creditCard?.cpf,
            }),
            ...(paymentWay === 'boleto' && {
                document: userCpf,
            }),
        },
    };

    const res = await fetch(
        `${process.env.HELPFLIX_BASE_URL}/functions/v1/checkout`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        },
    );

    return res;
}
