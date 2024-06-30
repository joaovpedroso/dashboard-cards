import { isValidDate } from "./date";

jest
  .useFakeTimers()
  .setSystemTime(new Date("2024-01-01"));

const cases = [
    {
        date: "24-06-04",
        expectedValue: false
    },
    {
        date: "2020-12-01",
        expectedValue: true
    }
];

describe("date validator", () => {
    test.each(cases)("return correct values as valid or invalid date", ({ date, expectedValue }) => {
        const result = isValidDate(String(date));
        expect(result).toBe(expectedValue);
    });

});