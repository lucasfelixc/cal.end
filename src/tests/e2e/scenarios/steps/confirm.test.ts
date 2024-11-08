import {test, expect, Page} from '@playwright/test';
import {fillAddressData, fillDonateValue, fillPersonalData, fillCheckoutData} from '../../utils/helpers';

type FillProfileDataUntilSuccessStepProps = {
    page: Page,
    isSubscription?: boolean,
};

export const fillProfileDataUntilSuccessStep = async (props: FillProfileDataUntilSuccessStepProps): Promise<void> => {
    const {page, isSubscription = true} = props;

    await page.goto('/nome-da-ong');

    await fillDonateValue({page: page, isSubscription: isSubscription});

    await fillPersonalData(page);

    await fillAddressData(page);

    await fillCheckoutData(page);
};

test('Viewing the success page after subscribing', async ({page}) => {
    await fillProfileDataUntilSuccessStep({page: page});

    await expect(page.getByRole('heading', {level: 2, name: /Deu tudo certo!/})).toBeVisible({timeout: 10000});

    await expect(page.getByText(/Agora você contribuiu!/)).toBeVisible({timeout: 10000});

    await expect(page.getByText(/Valor da assinatura/)).toBeVisible();

    await expect(page.getByText(/R\$\s+10,00/)).toBeVisible();

    await expect(page.getByText(/\/mês/)).toBeVisible();

    await expect(page.getByText(/Para tornar o mundo melhor/)).toBeVisible();

    await expect(page.getByText(
        'Você irá receber um email com a confirmação de pagamento'
        + ' e o cadastro no site donator.helpflix.com.br para gerenciar seus pagamentos.',
    )).toBeVisible();
});

test('Viewing the success page after donating', async ({page}) => {
    await fillProfileDataUntilSuccessStep({page: page, isSubscription: false});

    await expect(page.getByRole('heading', {level: 2, name: /Deu tudo certo!/})).toBeVisible({timeout: 10000});

    await expect(page.getByText(/Agora você contribuiu!/)).toBeVisible({timeout: 10000});

    await expect(page.getByText(/Valor da doação/)).toBeVisible();

    await expect(page.getByText(/R\$\s+10,00/)).toBeVisible();

    await expect(page.getByText(/\/mês/)).not.toBeVisible();

    await expect(page.getByText(/Para tornar o mundo melhor/)).toBeVisible();

    await expect(page.getByText(
        'Você irá receber um email com a confirmação de pagamento'
        + ' e o cadastro no site donator.helpflix.com.br para gerenciar seus pagamentos.',
    )).toBeVisible();
});

test('Returning to the value step', async ({page}) => {
    await fillProfileDataUntilSuccessStep({page: page});

    await expect(page.getByRole('heading', {level: 2, name: /Deu tudo certo!/})).toBeVisible({timeout: 10000});

    const donateAgainButton = page.getByRole('button', {name: /Doar novamente/});

    await expect(donateAgainButton).toBeVisible();

    await donateAgainButton.click();

    await expect(page.getByRole('heading', {level: 2, name: /Faça sua assinatura/})).toBeVisible();
});
