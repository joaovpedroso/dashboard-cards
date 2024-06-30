import { render, screen, waitFor } from "@testing-library/react";
import TextFieldCpf from ".";
import userEvent from "@testing-library/user-event";

describe("TextFieldCpf", () => {

    it("Should render textfield", () => {
        render(<TextFieldCpf id="textField" name="field name" placeholder="field placeholder" label="Field label"/>);

        expect(screen.getByPlaceholderText("field placeholder")).toBeInTheDocument();
        expect(screen.getByLabelText("Field label")).toBeInTheDocument();
    });

    it("Should render textfield cpf error", () => {
        render(<TextFieldCpf id="textField" name="field name" placeholder="field placeholder" label="Field label" error="Has error in text field"/>);

        expect(screen.getByText("Has error in text field")).toBeInTheDocument();
    });

    it("Should render message when invalid value", async () => {
        const mockHandleChange = jest.fn();

        render(<TextFieldCpf id="textField" name="field name" placeholder="field placeholder" label="Field label" $handleChange={mockHandleChange}/>);

        const input = screen.getByPlaceholderText("field placeholder");
        expect(input).toBeInTheDocument();

        expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();
        
        await waitFor(() => userEvent.type(input, "00000000000"));
        expect(screen.getByText("CPF inválido")).toBeInTheDocument();

        await waitFor(() => userEvent.type(input, "11111111111"));
        expect(screen.getByText("CPF inválido")).toBeInTheDocument();

        expect(mockHandleChange).not.toHaveBeenCalled();
    });

    it("Should call prop callback when is valid value", async () => {
        const mockHandleChange = jest.fn();

        render(<TextFieldCpf id="textField" name="field name" placeholder="field placeholder" label="Field label" $handleChange={mockHandleChange}/>);

        const input = screen.getByPlaceholderText("field placeholder");
        expect(input).toBeInTheDocument();

        expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();
        
        await waitFor(() => userEvent.type(input, "20849931053"));
        
        expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();

        expect(mockHandleChange).toHaveBeenCalledWith("208.499.310-53");
    });

});