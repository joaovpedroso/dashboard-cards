import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormData } from "~/pages/NewUser";
import { newRegistration } from "~/services/registrations";
import { IRegistration, StatusEnum } from "~/services/registrations/types";
import { formatDate } from "~/utils/formatters";
import { removeNumberMasks } from "~/utils/mask";

export type useNewRegistrationProps = {
    onSuccess?: () => void,
    onError?: () => void,
}

const useNewRegistration = ({ onSuccess, onError }: useNewRegistrationProps) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ["newRegistration"],
        mutationFn: newRegistration,
        onSuccess: () => { 
            onSuccess?.();
            setIsLoading(false);
        },
        onError: () => { 
            onError?.();
            setIsLoading(false);
        },
    });

    const [isLoading, setIsLoading] = useState(isPending);

    const handleCreateRegistration = (registration: IRegistration) => {
        setIsLoading(true);
        mutate(registration);
    };

    const formatNewRegistrationValues = (formData: FormData): IRegistration => {
        return {
            ...formData,
            admissionDate: formatDate(formData.admissionDate),
            status: StatusEnum.REVIEW,
            cpf: removeNumberMasks(formData.cpf)
        };
    };

    return {
        isLoading: isLoading || isPending,
        create: handleCreateRegistration,
        formatNewRegistrationValues
    };
};

export default useNewRegistration;