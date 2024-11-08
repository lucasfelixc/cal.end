import {test, expect} from '@playwright/test';

test('Viewing not found page', async ({page}) => {
    await page.goto('/');

    await expect(page.getByRole('heading', {name: '404'})).toBeVisible();

    await expect(page.getByText('Desculpe, mas...')).toBeVisible();

    await expect(page.getByRole('heading', {name: 'Não encontramos a página que você procura'})).toBeVisible();

    await expect(page.getByText('Certifique-se de estar utilizando um link válido ou tente novamente.')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Tentar novamente'})).toBeVisible();

    await expect(page.getByRole('img', {name: 'Logo da helpflix'})).toBeVisible();
});
