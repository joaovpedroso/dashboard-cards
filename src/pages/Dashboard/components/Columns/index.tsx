import { IRegistration, StatusEnum } from "~/services/registrations/types";
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: StatusEnum.REVIEW, title: "Pronto para revisar" },
  { status: StatusEnum.APROVED, title: "Aprovado" },
  { status: StatusEnum.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: IRegistration[];
};
const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.filter(registration => registration.status === collum.status)?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Collumns;