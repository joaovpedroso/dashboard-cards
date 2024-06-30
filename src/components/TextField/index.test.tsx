import { render, screen } from "@testing-library/react";
import TextField from ".";

describe("TextField", () => {

    it("Should render textfield", () => {
        render(<TextField id="textField" name="field name" placeholder="field placeholder" label="Field label"/>);

        expect(screen.getByPlaceholderText("field placeholder")).toBeInTheDocument();
        expect(screen.getByLabelText("Field label")).toBeInTheDocument();
    });

    it("Should render textfield error", () => {
        render(<TextField id="textField" name="field name" placeholder="field placeholder" label="Field label" error="Has error in text field"/>);

        expect(screen.getByText("Has error in text field")).toBeInTheDocument();
    });

});