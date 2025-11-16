"use client";

import {
    createContext,
    FunctionComponent,
    useMemo,
    PropsWithChildren,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";

export type PaymentWay = "card" | "pix";

export type ScheduleData = {
    service: {
        date: string;
        time: string;
    };
    user: {
        firstname: string;
        lastname: string;
        cpf: string;
        phone: string;
        email: string;
        birthday: string;
    };
    address: {
        street: string;
        number: string;
        neighborhood: string;
        zipcode: string;
        complement: string;
        city: string;
        state: string;
    };
    paymentWay: PaymentWay;
    paymentMethodInfo: {
        creditCard: {
            cardNumber: string;
            cardHolderName: string;
            cvc: string;
            exp_month: string;
            exp_year: string;
            cpf: string;
        };
    };
};

export type Schedule = DeepPartial<ScheduleData>;

export type ScheduleInfoState = {
    scheduleInfo: Schedule | null;
    setScheduleInfo: Dispatch<SetStateAction<Schedule | null>>;
};

export const ScheduleInfoContext = createContext<ScheduleInfoState>({
    scheduleInfo: null,
    setScheduleInfo: () => null,
});

export const ScheduleInfoProvider: FunctionComponent<PropsWithChildren> = (
    props
) => {
    const { children } = props;
    const [scheduleInfo, setScheduleInfo] = useState<Schedule | null>(null);

    const scheduleInfoState: ScheduleInfoState = useMemo(
        () => ({
            scheduleInfo: scheduleInfo,
            setScheduleInfo: setScheduleInfo,
        }),
        [scheduleInfo, setScheduleInfo]
    );

    return (
        <ScheduleInfoContext.Provider value={scheduleInfoState}>
            {children}
        </ScheduleInfoContext.Provider>
    );
};

export function useScheduleInfo(): ScheduleInfoState {
    const context = useContext(ScheduleInfoContext);

    if (context == null) {
        throw new Error(
            "useScheduleInfo must be used within a <ScheduleInfoProvider />"
        );
    }

    return context;
}
