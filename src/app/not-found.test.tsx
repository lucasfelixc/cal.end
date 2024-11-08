import {expect, it, describe, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import NotFound from './not-found';

vi.mock('next/navigation', async importOriginal => {
    const actual = await importOriginal();

    return {
        ...actual as typeof importOriginal,
        useRouter: vi.fn(),
        usePathname: (): string => 'pathname',
    };
});

describe('<NotFound />', () => {
    it('should render not found page', () => {
        render(<NotFound />);

        expect(screen.getByRole('heading', {level: 1, name: '404'})).toBeInTheDocument();

        expect(screen.getByText('Desculpe, mas...')).toBeInTheDocument();

        expect(screen.getByRole('heading', {
            level: 2,
            name: 'Não encontramos a página que você procura',
        })).toBeInTheDocument();
    });
});
