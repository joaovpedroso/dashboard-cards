import { isValidCPF } from "./cpf";

const casesFnIsValidCPF = [
    {
        cpf: "00000000000",
        expectedValue: false
    },
    {
        cpf: "000.000.000-00",
        expectedValue: false
    },
    {
        cpf: "000.000.000",
        expectedValue: false
    },
    {
        cpf: "123.456.789-88",
        expectedValue: false
    },
    
    {
        cpf: "123.456.789-01",
        expectedValue: false
    },
    
    {
        cpf: "123.456.789-00",
        expectedValue: false
    },
    {
        cpf: "023.456.789-92",
        expectedValue: true
    },
    {
        cpf: "0234567892",
        expectedValue: false,
    },
    {
        cpf: "02345678924",
        expectedValue: false,
    }
];

describe("cpf validator", () => {
    test.each(casesFnIsValidCPF)("return correct values as valid or invalid CPF in isValidCPF", ({ cpf, expectedValue }) => {
        const result = isValidCPF(String(cpf));
        expect(result).toBe(expectedValue);
    });
});