import { formatDate } from "./date";

describe("date formatters", () => {

    it("returns correct formatted date", () => {
        const formattedDate = formatDate("2020-01-01");
        expect(formattedDate).toBe("01/01/2020");
    });

    it("returns correct invalid date", () => {
        const formattedDate = formatDate("2024");
        expect(formattedDate).toBe("01/01/2024");
    });


});