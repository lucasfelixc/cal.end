'use client';

import {
    createContext,
    FunctionComponent,
    useMemo,
    PropsWithChildren,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react';

export type PaymentWay = 'card' | 'boleto';

export type DonatorInfo = {
    user: {
        firstname: string,
        lastname: string,
        cpf: string,
        phone: string,
        email: string,
        birthday: string,
    },
    address: {
        street: string,
        number: string,
        neighborhood: string,
        zipcode: string,
        complement: string,
        city: string,
        state: string,
    },
    paymentWay: PaymentWay,
    payment: {
        amount: number,
        recurring_payment_enabled: boolean,
        ngo_slug: string,
        payment_method_id: string,
        document: number,
    },
    paymentMethodInfo: {
        creditCard: {
            cardNumber: string,
            cardHolderName: string,
            cvc: string,
            exp_month: string,
            exp_year: string,
            cpf: string,
        },
    },
};

export type Donator = DeepPartial<DonatorInfo>;

export type DonatorInfoState = {
  donatorInfo: Donator | null,
  setDonatorInfo: Dispatch<SetStateAction<Donator | null>>,
};

export const DonatorInfoContext = createContext<DonatorInfoState>({
    donatorInfo: null,
    setDonatorInfo: () => null,
});

export const DonatorInfoProvider: FunctionComponent<PropsWithChildren> = props => {
    const {children} = props;
    const [donatorInfo, setDonatorInfo] = useState<Donator | null>(null);

    const donatorInfoState: DonatorInfoState = useMemo(
        () => ({
            donatorInfo: donatorInfo,
            setDonatorInfo: setDonatorInfo,
        }),
        [donatorInfo, setDonatorInfo],
    );

    return (
        <DonatorInfoContext.Provider value={donatorInfoState}>
            {children}
        </DonatorInfoContext.Provider>
    );
};

export function useDonatorInfo(): DonatorInfoState {
    const context = useContext(DonatorInfoContext);

    if (context == null) {
        throw new Error(
            'useDonatorInfo must be used within a <DonatorInfoProvider />',
        );
    }

    return context;
}
