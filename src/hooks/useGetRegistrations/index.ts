import { useQuery } from "@tanstack/react-query";
import { getRegistrations } from "~/services/registrations";
import { IQueryParams, IRegistration } from "~/services/registrations/types";

const useGetRegistrations = (params?: IQueryParams) => {
    const { data, refetch, isLoading, isFetching } = useQuery<IRegistration[]>({
        queryKey: ["registrations"],
        queryFn: () => getRegistrations(params),
        enabled: false
    });

    return {
        registrations: data,
        refetch,
        isLoading,
        isFetching
    };
};

export default useGetRegistrations;