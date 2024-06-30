import { createPortal } from "react-dom";

const Modal = ({ children }: {children: JSX.Element}) => {

  const element = document.getElementById("modal-root") as HTMLElement;

    return createPortal(
      <div className="modal">{children}</div>,
      element
    );
};

export default Modal;