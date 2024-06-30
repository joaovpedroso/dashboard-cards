import { useEffect } from "react";
import useGetRegistrations from "~/hooks/useGetRegistrations";
import useChangeRegistrationStatus from "~/hooks/useChangeRegistrationStatus";
import Collumns from "./components/Columns";
import SearchBar from "./components/Searchbar";
import SkeletonColumns from "./components/SkeletonColumns";
import * as S from "./styles";

const DashboardPage = () => {
  const { registrations, isLoading, isFetching, refetch } = useGetRegistrations();
  const { isLoading: isLoadingUpdateRegistration } = useChangeRegistrationStatus();

  const isLoadingRequests = isLoading || isFetching || isLoadingUpdateRegistration;

  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
   
      <S.Container>
        <SearchBar />

        {
          isLoadingRequests
          ? <SkeletonColumns />
          : <Collumns registrations={registrations} />
        }

      </S.Container>
  );
};

export default DashboardPage;