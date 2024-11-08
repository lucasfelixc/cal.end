import {test, expect} from '@playwright/test';

test('Entering a donation amount using suggested amount buttons', async ({page}) => {
    await page.goto('/nome-da-ong');

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: 'Faça sua assinatura'})).toBeVisible();

    await expect(page.getByText('Faça a assinatura do bem e ajude quem mais precisa!')).toBeVisible();

    await expect(page.getByRole('radiogroup', {name: 'Valores sugeridos de assinatura'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 10 Reais por mês'})).toBeVisible();

    await page.getByRole('radio', {name: 'Assine 10 Reais por mês'}).check({force: true});

    await expect(page.getByRole('textbox', {name: 'Valor da assinatura'})).toHaveValue(/^\s*R\$\s+10\s*$/i);
});

test('Entering different donation amounts using the suggested amount buttons', async ({page}) => {
    await page.goto('/nome-da-ong');

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    await expect(page.getByRole('radiogroup', {name: 'Valores sugeridos de assinatura'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 10 Reais por mês'})).toBeVisible();

    await page.getByRole('radio', {name: 'Assine 10 Reais por mês'}).check({force: true});

    const donateInputValueFirstValue = await page.getByRole('textbox', {name: 'Valor da assinatura'}).inputValue();

    expect(donateInputValueFirstValue.replace(/\s/g, '')).toBe('R$10');

    await expect(page.getByRole('radio', {name: 'Assine 30 Reais por mês'})).toBeVisible();

    await page.getByRole('radio', {name: 'Assine 30 Reais por mês'}).check({force: true});

    await expect(page.getByRole('textbox', {name: 'Valor da assinatura'})).toHaveValue(/^\s*R\$\s+30\s*$/i);
});

test('Entering a donation amount using the field donation', async ({page}) => {
    await page.goto('/nome-da-ong');

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    const donateInputField = page.getByRole('textbox', {name: 'Valor da assinatura'});

    await expect(donateInputField).toBeVisible();

    await donateInputField.fill('15');

    await expect(donateInputField).toHaveValue(/^\s*R\$\s+15\s*$/i);
});

test('Entering an invalid donation amount', async ({page}) => {
    await page.goto('/nome-da-ong');

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    await page.getByRole('button', {name: 'Continuar'}).click();

    await expect(page.getByText('Este campo não pode ser vazio.')).toBeVisible();
});

test('Switching between subscription and donation flow', async ({page}) => {
    await page.goto('/nome-da-ong');

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: 'Faça sua assinatura'})).toBeVisible();

    await expect(page.getByText('Faça a assinatura do bem e ajude quem mais precisa!')).toBeVisible();

    await expect(page.getByRole('radiogroup', {name: 'Valores sugeridos de assinatura'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 10 Reais por mês'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 30 Reais por mês'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 50 Reais por mês'})).toBeVisible();

    await expect(page.getByText('Caso prefira, digite o valor desejado para a assinatura:')).toBeVisible();

    await page.getByRole('switch', {name: 'Desejo doar apenas uma vez, não assinar.'}).check();

    await expect(page.getByRole('heading', {level: 2, name: 'Faça sua doação'})).toBeVisible();

    await expect(page.getByText('Faça a doação do bem e ajude quem mais precisa!')).toBeVisible();

    await expect(page.getByRole('radiogroup', {name: 'Valores sugeridos de doação'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Doe 10 Reais'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Doe 30 Reais'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Doe 50 Reais'})).toBeVisible();

    await expect(page.getByText('Caso prefira, digite o valor desejado para a doação:')).toBeVisible();
});
