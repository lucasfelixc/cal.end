import {test, expect, Page} from '@playwright/test';
import {fillDonateValue, fillPersonalData} from '../../utils/helpers';

const goToAddressDataStep = async (page: Page): Promise<void> => {
    await page.goto('/nome-da-ong');

    await fillDonateValue({page: page});

    await fillPersonalData(page);
};

test('Entering a valid address usign data of zipcode', async ({page}) => {
    await goToAddressDataStep(page);

    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).toBeVisible();

    await expect(page.getByText(/Informe seu endereço abaixo/)).toBeVisible();

    await page.getByRole('textbox', {name: /CEP/}).fill('58035130');

    await page.getByRole('textbox', {name: /CEP/}).blur();

    await expect(page.getByRole('textbox', {name: /Rua/})).toHaveValue('Rua Irmão Antônio Reginaldo');

    // To understand this role,
    // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#accessibility_concerns
    await page.getByRole('spinbutton', {name: /Número do endereço/}).fill('250');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await expect(page.getByRole('textbox', {name: /Bairro/})).toHaveValue('Bessa');

    await expect(page.getByRole('textbox', {name: /Cidade/})).toHaveValue('João Pessoa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).toBeVisible();
});

test('Entering an address without zip code', async ({page}) => {
    await goToAddressDataStep(page);

    await page.getByRole('textbox', {name: /Rua/}).fill('Rua Irmão Antônio Reginaldo');

    await page.getByRole('spinbutton', {name: /Número do endereço/}).fill('250');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await page.getByRole('textbox', {name: /Bairro/}).fill('Bessa');

    await page.getByRole('textbox', {name: /Cidade/}).fill('João Pessoa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O CEP deve conter 8 dígitos.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).not.toBeVisible();
});

test('Entering an address without street', async ({page}) => {
    await goToAddressDataStep(page);

    await page.getByRole('textbox', {name: /CEP/}).fill('58035132');

    await page.getByRole('spinbutton', {name: /Número do endereço/}).fill('250');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await page.getByRole('textbox', {name: /Bairro/}).fill('Bessa');

    await page.getByRole('textbox', {name: /Cidade/}).fill('João Pessoa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo rua é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).not.toBeVisible();
});

test('Entering an address without number', async ({page}) => {
    await goToAddressDataStep(page);

    await page.getByRole('textbox', {name: /CEP/}).fill('58035130');

    await page.getByRole('textbox', {name: /CEP/}).blur();

    await expect(page.getByRole('textbox', {name: /Rua/})).toHaveValue('Rua Irmão Antônio Reginaldo');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await expect(page.getByRole('textbox', {name: /Bairro/})).toHaveValue('Bessa');

    await expect(page.getByRole('textbox', {name: /Cidade/})).toHaveValue('João Pessoa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo número é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).not.toBeVisible();
});

test('Entering an address without neighborhood', async ({page}) => {
    await goToAddressDataStep(page);

    await page.getByRole('textbox', {name: /CEP/}).fill('58035132');

    await page.getByRole('textbox', {name: /CEP/}).blur();

    await page.getByRole('textbox', {name: /Rua/}).fill('Rua Irmão Antônio Reginaldo');

    await page.getByRole('spinbutton', {name: /Número do endereço/}).fill('250');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await page.getByRole('textbox', {name: /Cidade/}).fill('João Pessoa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo bairro é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).not.toBeVisible();
});

test('Entering an address without city', async ({page}) => {
    await goToAddressDataStep(page);

    await page.getByRole('textbox', {name: /CEP/}).fill('58035132');

    await page.getByRole('textbox', {name: /CEP/}).blur();

    await page.getByRole('textbox', {name: /Rua/}).fill('Rua Irmão Antônio Reginaldo');

    await page.getByRole('spinbutton', {name: /Número do endereço/}).fill('250');

    await page.getByRole('textbox', {name: /Complemento do endereço/}).fill('apto 401');

    await page.getByRole('textbox', {name: /Bairro/}).fill('Bessa');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo cidade é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).not.toBeVisible();
});
