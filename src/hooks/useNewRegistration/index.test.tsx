import { renderHook, waitFor } from "@testing-library/react";
import useNewRegistration from ".";
import { StatusEnum } from "~/services/registrations/types";
import { hookWrapper } from "~/utils/test";


const mockMutation = jest.fn();

jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useMutation: () => ({
        mutate: mockMutation
    })
}));

describe("useNewRegistration", () => {

    it("should return formatted registration", () => {
        const { result } = renderHook(() => useNewRegistration({onSuccess: jest.fn(), onError: jest.fn()}), {
            wrapper: hookWrapper()
        });

        const formatedValues = result.current.formatNewRegistrationValues({
            admissionDate: "2024-06-08",
            cpf: "72897749067",
            email: "jose@email.com",
            employeeName: "José da silva"
        });

        expect(formatedValues).toEqual({
            admissionDate: "08/06/2024",
            cpf: "72897749067",
            email: "jose@email.com",
            employeeName: "José da silva",
            status: StatusEnum.REVIEW
        });

    });

    it("call mutate on create function is called", async () => {
        const { result } = renderHook(() => useNewRegistration({onSuccess: jest.fn(), onError: jest.fn()}), {
            wrapper: hookWrapper()
        });

        const formatedValues = result.current.formatNewRegistrationValues({
            admissionDate: "2024-06-08",
            cpf: "72897749067",
            email: "jose@email.com",
            employeeName: "José da silva"
        });

        await waitFor(() => result.current.create(formatedValues));

        expect(mockMutation).toHaveBeenCalled();
        expect(result.current.isLoading).toBe(true);
    });

});