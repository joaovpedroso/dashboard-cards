import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteRegistration } from "~/services/registrations";
import useToast from "../useToast";
import useGetRegistrations from "../useGetRegistrations";
import useSearchTermContext from "../useSearchTermContext";
import { removeNumberMasks } from "~/utils/mask";

const useDeleteRegistration = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { errorToast, successToast } = useToast();

    const { term } = useSearchTermContext();
    const { refetch } = useGetRegistrations({
        cpf: removeNumberMasks(term)
    });

    const { mutate, isSuccess, isError } = useMutation({
        mutationKey: ["deleteRegistration"],
        mutationFn: deleteRegistration,
        onSuccess: () => {
            refetch();
            setIsLoading(false);
            successToast("Registro deletado com sucesso!");
        },
        onError: () => {
            setIsLoading(false);
            errorToast("Não foi possível deletar o registro.");
        }
    });


    const deleteRegister = (registrationID: string) => {
        mutate(registrationID);
    };

    return {
        isSuccess,
        isError,
        isLoading,
        deleteRegister
    };
};

export default useDeleteRegistration;