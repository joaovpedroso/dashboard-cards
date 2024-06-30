/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextFieldCpf from "~/components/TextFieldCpf";
import useGetRegistrations from "~/hooks/useGetRegistrations";
import { useDebounce } from "~/hooks/useDebounce";
import routes from "~/router/routes";
import { removeNumberMasks } from "~/utils/mask";
import * as S from "./styles";
import useSearchTermContext from "~/hooks/useSearchTermContext";

const SearchBar = () => {

  const { term: searchTerm, changeTerm } = useSearchTermContext();
  
  const debouncedTerm = useDebounce(searchTerm, 500);
  
  const history = useHistory();
  const { refetch } = useGetRegistrations({
    cpf: removeNumberMasks(debouncedTerm)
  });

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  const handleChangeSearch = (value: string) => {
    changeTerm(value);
  };

  useEffect(() => {
    refetch();
}, [debouncedTerm]);

  return (
    <S.Container>
      <TextFieldCpf placeholder="Digite um CPF válido" $handleChange={handleChangeSearch} value={searchTerm} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => refetch()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

export default SearchBar;