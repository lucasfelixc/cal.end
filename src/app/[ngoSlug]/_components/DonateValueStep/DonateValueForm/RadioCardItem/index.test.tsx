import {FunctionComponent} from 'react';
import {expect, it, describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {FormProvider, useForm} from 'react-hook-form';
import {RadioGroup} from '@/components/ui/RadioGroup';
import {RadioCardItem, RadioCardItemProps} from './index';

describe('<RadioCardItem />', () => {
    type SutProps = Partial<RadioCardItemProps>;

    const Sut: FunctionComponent<SutProps> = props => {
        const {isSelected = false, isSubscription = false, field = {id: 'id', value: '10'}} = props;
        const methods = useForm();

        return (
            <FormProvider {...methods}>
                <RadioGroup>
                    <RadioCardItem isSelected={isSelected} isSubscription={isSubscription} field={field} />
                </RadioGroup>
            </FormProvider>
        );
    };

    it('should render a radio card item', () => {
        render(<Sut />);

        expect(screen.getByRole('radio', {name: /Doe 10 reais/})).toBeInTheDocument();

        expect(screen.getByText(/Doe/)).toBeInTheDocument();

        expect(screen.getByText(/10 Reais/)).toBeInTheDocument();
    });

    it('should render a radio card item used in a subscription context', () => {
        render(<Sut isSubscription />);

        expect(screen.getByRole('radio', {name: /Assine 10 reais por mês/})).toBeInTheDocument();

        expect(screen.getByText(/Assine/)).toBeInTheDocument();

        expect(screen.getByText(/10 Reais/)).toBeInTheDocument();

        expect(screen.getByText(/por mês/)).toBeInTheDocument();
    });

    it('should render a selected radio card item', async () => {
        render(<Sut isSelected />);

        const radioItem = screen.getByRole('radio', {name: /Doe 10 reais/});

        expect(radioItem).toBeInTheDocument();

        await userEvent.click(radioItem);

        expect(radioItem).toBeChecked();
    });
});
