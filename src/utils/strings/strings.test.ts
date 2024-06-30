import { isValidName, removeAcentuation } from ".";

const casesAcentuation = [
    {
        value: "José da silva",
        expectedValue: "Jose da silva",
    },
    {
        value: "João da costa",
        expectedValue: "Joao da costa",
    }
];

const casesName = [
    {
        value: "1José da silva",
        expectedValue: false,
    },
    {
        value: "Cladioaparecido",
        expectedValue: false
    },
    {
        value: "Joãodacosta",
        expectedValue: false
    },
    {
        value: "José da silva",
        expectedValue: true,
    },
    {
        value: "Jo se",
        expectedValue: true,
    },
    {
        value: "J",
        expectedValue: false,
    },
];

describe("string utils", () => {

    test.each(casesAcentuation)("format correct values with acentuation", ({ value, expectedValue }) => {
        const expected = removeAcentuation(value);
        expect(expected).toBe(expectedValue);
    });

    test.each(casesName)("return is valid or invalid value", ({ value, expectedValue }) => {
        const expected = isValidName(value);
        expect(expected).toBe(expectedValue);
    });

});