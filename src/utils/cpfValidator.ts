export function cpfValidator(cpf: string): number | boolean {
    // Removes all non-numeric characters
    const newCpfValue = cpf.replace(/[^\d]/g, '');

    if (newCpfValue.length !== 11) {
        return false;
    }

    // Checks if all digits are equal
    if (/^(\d)\1{10}$/.test(newCpfValue)) {
        return false;
    }

    // Calculates the first check digit
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += parseInt(newCpfValue.charAt(i), 10) * (10 - i);
    }

    let firstDigit = 11 - (sum % 11);

    // Calculates the second check digit
    sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(newCpfValue.charAt(i), 10) * (11 - i);
    }

    let secondDigit = 11 - (sum % 11);

    // Checks whether check digits are valid
    if (firstDigit === 10 || firstDigit === 11) {
        firstDigit = 0;
    }

    if (secondDigit === 10 || secondDigit === 11) {
        secondDigit = 0;
    }

    return (
        parseInt(newCpfValue.charAt(9), 10) === firstDigit && parseInt(newCpfValue.charAt(10), 10) === secondDigit
    );
}
