import { useMutation } from "@tanstack/react-query";
import { putRegistration } from "~/services/registrations";
import { IRegistration, StatusEnum } from "~/services/registrations/types";
import useGetRegistrations from "../useGetRegistrations";
import { useState } from "react";
import useToast from "../useToast";
import useSearchTermContext from "../useSearchTermContext";
import { removeNumberMasks } from "~/utils/mask";

const useChangeRegistrationStatus = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { errorToast, successToast } = useToast();

    const { term: searchTerm } = useSearchTermContext();

    const { refetch } = useGetRegistrations({
        cpf: removeNumberMasks(searchTerm)
    });

    const { mutate, isSuccess, isError, status } = useMutation({
        mutationKey: ["changeRegistration"],
        mutationFn: putRegistration,
        onSuccess: () => {
            refetch();
            setIsLoading(false);
            successToast("Atualizado com sucesso!");
        },
        onError: () => {
            setIsLoading(false);
            errorToast("Não foi possível atualizar.");
        }
    });

    const changeStatus = (registration: IRegistration, newStatus: StatusEnum) => {
        setIsLoading(true);
        mutate({
            ...registration,
            status: newStatus
        });
    };

    return {
        status,
        isSuccess,
        isError,
        isLoading,
        changeStatus
    };
};

export default useChangeRegistrationStatus;