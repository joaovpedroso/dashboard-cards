import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { IRegistration, StatusEnum } from "~/services/registrations/types";
import ReviewActions from "../ReviewActions";
import ReviewedActions from "../ReviewedActions";
import { useMemo, useState } from "react";
import ConfirmationModal from "~/components/ConfirmationModal";
import useDeleteRegistration from "~/hooks/useDeleteRegistration";

export type TReviewActions = {
  registration: IRegistration
}

type TRegistrationCard = {
  data: IRegistration;
};

const RegistrationCard = (props: TRegistrationCard) => {  
  
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const { deleteRegister } = useDeleteRegistration();

  const handleToggleModal = () => {
    setIsVisibleModal(visibleModal => !visibleModal);
  };

  const handleConfirmDeletion = () => {
    deleteRegister(props.data.id ?? "");
  };

  const mapCardActions = useMemo(() => ({
    [StatusEnum.REVIEW]: <ReviewedActions registration={props.data} />,
    [StatusEnum.APROVED]: <ReviewActions registration={props.data} />,
    [StatusEnum.REPROVED]: <ReviewActions registration={props.data} />,
  }), [props.data]);
    
  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{props.data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{props.data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{props.data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          { mapCardActions[props.data.status] }
          <HiOutlineTrash onClick={handleToggleModal} />
        </S.Actions>
      </S.Card>
    
      {
        isVisibleModal && <ConfirmationModal subtitle="O usuário será deletado permanentemente." isOpen onConfirm={handleConfirmDeletion} onRefuse={handleToggleModal} />
      }
    </>
  );
};

export default RegistrationCard;
