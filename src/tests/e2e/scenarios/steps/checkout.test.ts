import {test, expect, Page} from '@playwright/test';
import {fillDonateValue, fillPersonalData, fillAddressData} from '../../utils/helpers';

// @todo: Implement terms of use and privacy policy tests

type FillProfileDataUntilCheckoutStepProps = {
    page: Page,
    isSubscription?: boolean,
};

export const fillProfileDataUntilCheckoutStep = async (props: FillProfileDataUntilCheckoutStepProps): Promise<void> => {
    const {page, isSubscription = true} = props;

    await page.goto('/nome-da-ong');

    await fillDonateValue({page: page, isSubscription: isSubscription});

    await fillPersonalData(page);

    await fillAddressData(page);
};

test('Entering checkout information for a subscription', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page, isSubscription: true});

    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).toBeVisible();

    await expect(page.getByText(/Valor da assinatura/)).toBeVisible();

    await expect(page.getByText(/R\$\s+10,00/)).toBeVisible();

    await expect(page.getByText(/\/mês/)).toBeVisible();

    await expect(page.getByText(/Para tornar o mundo melhor/)).toBeVisible();

    await expect(page.getByRole('button', {name: /Alterar valor da assinatura/})).toBeVisible();

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByRole('heading', {level: 2, name: /Deu tudo certo!/})).toBeVisible({timeout: 10000});
});

test('Entering checkout information for a unique donation', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page, isSubscription: false});

    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).toBeVisible();

    await expect(page.getByText(/Valor da doação/)).toBeVisible();

    await expect(page.getByText(/R\$\s+10,00/)).toBeVisible();

    await expect(page.getByText(/\/mês/)).not.toBeVisible();

    await expect(page.getByText(/Para tornar o mundo melhor/)).toBeVisible();

    await expect(page.getByRole('button', {name: /Alterar valor da doação/})).toBeVisible();

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByRole('heading', {level: 2, name: /Deu tudo certo!/})).toBeVisible({timeout: 10000});
});

test('Entering checkout information without card number', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText(/O campo número do cartão é obrigatório./)).toBeVisible();
});

test('Entering checkout information without card name', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText(/O campo nome inserido no cartão é obrigatório./)).toBeVisible();
});

test('Entering checkout information without card CVC', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText(/O campo CVC é obrigatório./)).toBeVisible();
});

test('Entering checkout information without card expiration date', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Documento CPF/}).fill('69376797000');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText(/Este campo não pode ser vazio./)).toBeVisible();
});

test('Entering checkout information without CPF', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await page.getByRole('textbox', {name: /Número do cartão/}).fill('4242424242424242');

    await page.getByRole('textbox', {name: /Nome inserido no cartão/}).fill('John Doe');

    await page.getByRole('textbox', {name: /Código de segurança do cartão/}).fill('123');

    await page.getByRole('textbox', {name: /Data de vencimento do cartão/}).fill('1226');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText(/O campo CPF é obrigatório./)).toBeVisible();
});

test('Changing the donate value', async ({page}) => {
    await fillProfileDataUntilCheckoutStep({page: page});

    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados de pagamento/})).toBeVisible();

    await expect(page.getByText(/Valor da assinatura/)).toBeVisible();

    await expect(page.getByText(/R\$\s+10,00/)).toBeVisible();

    await expect(page.getByText(/\/mês/)).toBeVisible();

    const changeValueButton = page.getByRole('button', {name: /Alterar valor da assinatura/});

    await expect(changeValueButton).toBeVisible();

    await changeValueButton.click();

    await expect(page.getByRole('heading', {level: 2, name: /Faça sua assinatura/})).toBeVisible();
});
