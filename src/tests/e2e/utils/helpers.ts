/* eslint-disable testing-library/prefer-screen-queries -- This is a helper file */
import {expect, type Page} from '@playwright/test';

type FillDonateValueProps = {
    page: Page,
    isSubscription?: boolean,
};

export const fillDonateValue = async (props: FillDonateValueProps): Promise<void> => {
    const {page, isSubscription = true} = props;

    await expect(page.getByRole('heading', {level: 1, name: 'Nome da ong'})).toBeVisible();

    await expect(page.getByRole('radiogroup', {name: 'Valores sugeridos de assinatura'})).toBeVisible();

    await expect(page.getByRole('radio', {name: 'Assine 10 Reais por mês'})).toBeVisible();

    await page.getByRole('radio', {name: 'Assine 10 Reais por mês'}).check({force: true});

    await expect(page.getByRole('textbox', {name: 'Valor da assinatura'})).toHaveValue(/^\s*R\$\s+10\s*$/i);

    if (!isSubscription) {
        await page.getByRole('switch', {name: 'Desejo doar apenas uma vez, não assinar.'}).check();
    }

    await page.getByRole('button', {name: 'Continuar'}).click();
};

export const fillPersonalData = async (page: Page): Promise<void> => {
    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados pessoais/})).toBeVisible();

    await expect(page.getByText(/Informe seus dados abaixo/)).toBeVisible();

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();
};

export const fillAddressData = async (page: Page): Promise<void> => {
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
};

export const fillCheckoutData = async (page: Page): Promise<void> => {
    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).toBeVisible();

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();
};
