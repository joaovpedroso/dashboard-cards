import { cpfMask } from "./cpf";

const cases = [
    {
        value: "00000000000",
        expectedValue: "000.000.000-00"
    },
    {
        value: "000A90900011",
        expectedValue: "000.909.000-11"
    },
    {
        value: "AAAAAAAAAAA",
        expectedValue: ""
    },
    {
        value: "",
        expectedValue: ""
    }
];

describe("cpf masks", () => {
    test.each(cases)("return masked CPF values", ({ value, expectedValue }) => {
        const maskedValue = cpfMask(value);
        expect(maskedValue).toBe(expectedValue);
    });
});