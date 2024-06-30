import { useState } from "react";
import { ButtonSmall } from "~/components/Buttons";
import ConfirmationModal from "~/components/ConfirmationModal";
import useChangeRegistrationStatus from "~/hooks/useChangeRegistrationStatus";
import { StatusEnum } from "~/services/registrations/types";
import { TReviewActions } from "../RegistrationCard";

const ReviewedActions = ({ registration }: TReviewActions) => {

    const { changeStatus } = useChangeRegistrationStatus();

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [newStatus, setNewStatus] = useState<StatusEnum>(StatusEnum.REPROVED);


    const handleChangeStatus = (status: StatusEnum) => {
        setIsVisibleModal(true);
        setNewStatus(status);
    };

    const handleConfirmChange = () => {
        changeStatus(registration, newStatus);
        handleCloseModal();
    };

    const handleCloseModal = () => {
      setIsVisibleModal(false);
    };

    return (
        <>
            <ButtonSmall onClick={() => handleChangeStatus(StatusEnum.REPROVED)} bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
            <ButtonSmall onClick={() => handleChangeStatus(StatusEnum.APROVED)} bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>

            {
                isVisibleModal && <ConfirmationModal isOpen onConfirm={handleConfirmChange} onRefuse={handleCloseModal} />
            }
        </>
    );
};

export default ReviewedActions;