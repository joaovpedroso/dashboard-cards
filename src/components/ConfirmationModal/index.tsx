import { useEffect } from "react";
import Modal from "../Modal";
import * as S from "./styles";
import { ButtonSmall } from "../Buttons";

interface IConfirmationModal {
    isOpen: boolean,
    title?: string,
    subtitle?: string,
    onConfirm?: () => void,
    onRefuse?: () => void
}

const ConfirmationModal  = ({ title = "Tem certeza?", subtitle = "Você pode não conseguir desfazer essa ação depois.", isOpen, onConfirm, onRefuse }: IConfirmationModal) => {

    useEffect(() => {
        if( isOpen )
            document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "visible";
        };
    }, [isOpen]);

    if( !isOpen ) return;

    return (
        <Modal>
            <S.WrapperModal>
                <S.ModalContent>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>

                    <S.ModalFooter>
                        <ButtonSmall onClick={() => onRefuse?.()} color="#e80537" bgcolor="#fff">Voltar</ButtonSmall>
                        <ButtonSmall onClick={() => onConfirm?.()}>Confirmar</ButtonSmall>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.WrapperModal>
        </Modal>
    );
};

export default ConfirmationModal;