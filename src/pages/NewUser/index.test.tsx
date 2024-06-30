import { screen, waitFor } from "@testing-library/react";
import { renderByQueryClient } from "~/utils/test";
import NewUserPage from ".";
import userEvent from "@testing-library/user-event";
import useNewRegistration, { useNewRegistrationProps } from "~/hooks/useNewRegistration";

const mockHistoryPush = jest.fn();
const mockMutationFn = jest.fn();
const mockSuccessToast = jest.fn();
const mockErrorToast = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush
    })
}));

jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useMutation: () => ({
        mutate: mockMutationFn
    })
}));

jest.mock("~/hooks/useToast", () => ({
    default: () => ({
        successToast: mockSuccessToast,
        errorToast: mockErrorToast
    })
}));

jest.mock("~/hooks/useNewRegistration");

describe("NewUser", () => {

    beforeEach(() => {
        (useNewRegistration as jest.Mock).mockImplementation(
            ({onSuccess}: useNewRegistrationProps) => ({
                formatNewRegistrationValues: jest.fn(),
                create: () => {
                    mockMutationFn();
                    onSuccess?.();
                }
            })
        );
    });

    it("should visible error when submit empty form", async () => {
        renderByQueryClient(<NewUserPage />);

        const submitButton = screen.getByRole("button", { name: "Cadastrar" });
        expect(submitButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(submitButton));
        
        const requiredFields = screen.getAllByText("Campo obrigatório");
        expect(requiredFields).toHaveLength(3);

        const invalidEmailMessage = screen.getByText("Email inválido");
        expect(invalidEmailMessage).toBeInTheDocument();
    });

    it("should submit form after enter data", async () => {
        renderByQueryClient(<NewUserPage />);

        const submitButton = screen.getByRole("button", { name: "Cadastrar" });
        expect(submitButton).toBeInTheDocument();

        const fieldName = screen.getByPlaceholderText("Nome");
        const fieldEmail = screen.getByPlaceholderText("Email");
        const fieldCpf = screen.getByPlaceholderText("CPF");
        const fieldAdmissionDate = screen.getByLabelText("Data de admissão");

        expect(fieldName).toBeInTheDocument();
        expect(fieldEmail).toBeInTheDocument();
        expect(fieldCpf).toBeInTheDocument();
        expect(fieldAdmissionDate).toBeInTheDocument();

        await waitFor(() => userEvent.type(fieldName, "Claudio da silva"));
        await waitFor(() => userEvent.type(fieldEmail, "claudio@email.com"));
        await waitFor(() => userEvent.type(fieldCpf, "91905343019"));
        await waitFor(() => userEvent.type(fieldAdmissionDate, "2024-06-20"));

        expect(fieldName).toHaveValue("Claudio da silva");
        expect(fieldEmail).toHaveValue("claudio@email.com");
        expect(fieldCpf).toHaveValue("919.053.430-19");
        expect(fieldAdmissionDate).toHaveValue("2024-06-20");

        await waitFor(() => userEvent.click(submitButton));

        const modalConfirmationTitle = screen.getByText("Tem certeza?");
        expect(modalConfirmationTitle).toBeInTheDocument();

        const cancelButton = screen.getByRole("button", { name: "Voltar"});
        const confirmButton = screen.getByRole("button", { name: "Confirmar"});

        expect(cancelButton).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(cancelButton));
        expect(screen.queryByText("Tem certeza?")).not.toBeInTheDocument();

        await waitFor(() => userEvent.click(submitButton));
        
        expect(screen.getByRole("button", { name: "Confirmar"})).toBeInTheDocument();
        await waitFor(() => userEvent.click(screen.getByRole("button", { name: "Confirmar"})));

        expect(mockMutationFn).toHaveBeenCalled();
        expect(mockSuccessToast).toHaveBeenCalled();
        expect(mockHistoryPush).toHaveBeenCalled();
    });

    it("should error on submit form", async () => {

        (useNewRegistration as jest.Mock).mockImplementation(
            ({onError}: useNewRegistrationProps) => ({
                formatNewRegistrationValues: jest.fn(),
                create: () => {
                    mockMutationFn();
                    onError?.();
                }
            })
        );

        renderByQueryClient(<NewUserPage />);

        const submitButton = screen.getByRole("button", { name: "Cadastrar" });
        expect(submitButton).toBeInTheDocument();

        const fieldName = screen.getByPlaceholderText("Nome");
        const fieldEmail = screen.getByPlaceholderText("Email");
        const fieldCpf = screen.getByPlaceholderText("CPF");
        const fieldAdmissionDate = screen.getByLabelText("Data de admissão");

        expect(fieldName).toBeInTheDocument();
        expect(fieldEmail).toBeInTheDocument();
        expect(fieldCpf).toBeInTheDocument();
        expect(fieldAdmissionDate).toBeInTheDocument();

        await waitFor(() => userEvent.type(fieldName, "Claudio da silva"));
        await waitFor(() => userEvent.type(fieldEmail, "claudio@email.com"));
        await waitFor(() => userEvent.type(fieldCpf, "91905343019"));
        await waitFor(() => userEvent.type(fieldAdmissionDate, "2024-06-20"));

        expect(fieldName).toHaveValue("Claudio da silva");
        expect(fieldEmail).toHaveValue("claudio@email.com");
        expect(fieldCpf).toHaveValue("919.053.430-19");
        expect(fieldAdmissionDate).toHaveValue("2024-06-20");

        await waitFor(() => userEvent.click(submitButton));

        const modalConfirmationTitle = screen.getByText("Tem certeza?");
        expect(modalConfirmationTitle).toBeInTheDocument();

        const confirmButton = screen.getByRole("button", { name: "Confirmar"});
        expect(confirmButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(confirmButton));
        
        expect(mockMutationFn).toHaveBeenCalled();
        expect(mockErrorToast).toHaveBeenCalled();
        expect(mockHistoryPush).not.toHaveBeenCalledTimes(2);
    });

    it("should call navigate on click in back button", async () => {
        renderByQueryClient(<NewUserPage />);

        const backButton = screen.getByLabelText("back");
        expect(backButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(backButton));
        expect(mockHistoryPush).toHaveBeenCalled();
    });
});