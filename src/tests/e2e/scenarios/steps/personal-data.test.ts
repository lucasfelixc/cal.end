import {test, expect, Page} from '@playwright/test';
import {fillDonateValue} from '../../utils/helpers';

const goToPersonalDataStep = async (page: Page): Promise<void> => {
    await page.goto('/nome-da-ong');

    await fillDonateValue({page: page});
};

test('Entering personal data', async ({page}) => {
    await goToPersonalDataStep(page);

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

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).toBeVisible();
});

test('Entering personal data without name', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo nome é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a name shorter than the minimum allowed', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('Jo');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho mínimo do nome é de 3 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without last name', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo sobrenome é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a last name shorter than the minimum allowed', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Do');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho mínimo do sobrenome é de 3 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without phone', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho mínimo do telefone é de 11 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a phone shorter than the minimum allowed', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho mínimo do telefone é de 11 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without email', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo de email é obrigatório.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a email shorter than the minimum allowed', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('jo');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho mínimo do email é de 3 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a email longer than the maximum allowed', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@emaaaaaaaaaaaaaaaaaaaaaaaaail.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O tamanho máximo do email é de 40 caracteres.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data with a invalid email', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('Por favor, informe um email válido.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without birthday', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo dia de nascimento não pode ser vazio.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without birthmonth', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('textbox', {name: /Ano do nascimento/}).fill('1998');

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo mês de nascimento não pode ser vazio.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Entering personal data without birthyear', async ({page}) => {
    await goToPersonalDataStep(page);

    await page.getByRole('textbox', {name: /Nome/}).fill('John');

    await page.getByRole('textbox', {name: /Sobrenome/}).fill('Doe');

    await page.getByRole('textbox', {name: /Telefone/}).fill('5583999999999');

    await page.getByRole('textbox', {name: /Email/}).fill('johndoe@email.com');

    await page.getByRole('textbox', {name: /Dia do nascimento/}).fill('21');

    await page.getByRole('combobox', {name: /Mês do nascimento/}).click();

    await page.getByRole('option', {name: /Novembro/}).click();

    await page.getByRole('button', {name: /Continuar/}).click();

    await expect(page.getByText('O campo ano de nascimento não pode ser vazio.')).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Endereço/})).not.toBeVisible();
});

test('Returning to the previous step', async ({page}) => {
    await goToPersonalDataStep(page);

    await expect(page.getByRole('heading', {level: 1, name: /Nome da Ong/})).toBeVisible();

    await expect(page.getByRole('heading', {level: 2, name: /Dados pessoais/})).toBeVisible();

    await page.getByRole('button', {name: /Voltar para o passo anterior/}).click();

    await expect(page.getByRole('heading', {level: 2, name: /Faça sua assinatura/})).toBeVisible();
});
