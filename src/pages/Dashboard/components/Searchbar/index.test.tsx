import { screen, waitFor } from "@testing-library/react";
import SearchBar from ".";
import { renderByContext } from "~/utils/test";
import userEvent from "@testing-library/user-event";

const mockHistoryPush = jest.fn();
const mockRefetchGetRegistrations = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush
    })
}));

jest.mock("~/hooks/useGetRegistrations", () => ({
    default: () => ({
        refetch: mockRefetchGetRegistrations
    })
}));

describe("Searchbar", () => {

    it("should render correct value in CPF field after insert value", async () => {
        renderByContext(<SearchBar />);

        const cpfField = screen.getByPlaceholderText("Digite um CPF válido");

        expect(cpfField).toBeInTheDocument();

        await waitFor(() => userEvent.type(cpfField, "83935501064"));

        expect(cpfField).toHaveValue("839.355.010-64");
    });


    it("should call refetch method on click in refresh button", async () => {
        renderByContext(<SearchBar />);

        const refreshButton = screen.getByLabelText("refetch");

        expect(refreshButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(refreshButton));

        expect(mockRefetchGetRegistrations).toHaveBeenCalled();
    });

    it("should navigate to register page on click in new registration button", async () => {
        renderByContext(<SearchBar />);

        const registrationButton = screen.getByRole("button", {name: "Nova Admissão"});

        expect(registrationButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(registrationButton));

        expect(mockHistoryPush).toHaveBeenCalledWith("/new-user");
    });

});