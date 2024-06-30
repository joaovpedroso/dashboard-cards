import { ButtonSmall } from "~/components/Buttons";
import useChangeRegistrationStatus from "~/hooks/useChangeRegistrationStatus";
import { StatusEnum } from "~/services/registrations/types";
import { TReviewActions } from "../RegistrationCard";
import ConfirmationModal from "~/components/ConfirmationModal";
import { useState } from "react";

const ReviewActions = ({ registration }: TReviewActions) => {

    const { changeStatus } = useChangeRegistrationStatus();

    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const handleChangeStatus = () => {
      setIsVisibleModal(true);
    };

    const handleConfirmChange = () => {
      changeStatus(registration, StatusEnum.REVIEW);
      handleCloseModal();
    };

    const handleCloseModal = () => {
      setIsVisibleModal(false);
    };

    return (
      <>
        <ButtonSmall onClick={() => handleChangeStatus()} bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        {
          isVisibleModal && <ConfirmationModal isOpen onConfirm={handleConfirmChange} onRefuse={handleCloseModal} />
        }
      </>
    );
};

export default ReviewActions;