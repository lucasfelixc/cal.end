import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {ErrorHandling} from './index';

describe('<ErrorHandling />', () => {
    it('should render error handling page', () => {
        render(<ErrorHandling reset={vi.fn()} />);

        expect(screen.getByText('Desculpe, mas...')).toBeInTheDocument();

        expect(screen.getByRole('heading', {level: 1, name: 'Algo deu errado'})).toBeInTheDocument();

        expect(screen.getByText(
            'Houve um problema ao carregar a página. Por favor, tente atualizar a página novamente.',
        )).toBeInTheDocument();

        expect(screen.getByRole('button', {name: 'Tentar novamente'})).toBeInTheDocument();
    });

    it('should invoke reset callback when clicking the try again button', async () => {
        const callback = vi.fn();

        render(<ErrorHandling reset={callback} />);

        const tryAgainButton = screen.getByRole('button', {name: 'Tentar novamente'});

        expect(tryAgainButton).toBeInTheDocument();

        await userEvent.click(tryAgainButton);

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
