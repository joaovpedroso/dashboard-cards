import { render, screen, waitFor} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ConfirmationModal from ".";

describe("Confirmation Modal", () => {

    it("Should render opened modal", () => {
       const { baseElement: bodyElement } = render(<ConfirmationModal isOpen/>);
        
        expect(bodyElement).toHaveStyle("overflow: hidden");

        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByRole("paragraph")).toBeInTheDocument();

        expect(screen.getByRole("button", {name: "Confirmar"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Voltar"})).toBeInTheDocument();
    });

    it("Should render correct title and subtitle", () => {
        render(<ConfirmationModal isOpen title='Modal Title' subtitle='Modal subtitle'/>);
         
        expect(screen.getByText("Modal Title")).toBeInTheDocument();
        expect(screen.getByText("Modal subtitle")).toBeInTheDocument();
    });

    it("Should not render modal", () => {
        const { baseElement: bodyElement } = render(<ConfirmationModal isOpen={false}/>);
        
        expect(bodyElement).not.toHaveStyle("overflow: hidden");
        
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
    });

    it("Should call callback props on click in buttons", async () => {
        
        const mockOnConfirm = jest.fn();
        const mockOnRefuse = jest.fn();
        
        render(<ConfirmationModal isOpen onConfirm={mockOnConfirm} onRefuse={mockOnRefuse} />);

        
        const confirmButton = screen.getByRole("button", {name: "Confirmar"});
        const refuseButton  = screen.getByRole("button", {name: "Voltar"});

        expect(confirmButton).toBeInTheDocument();
        expect(refuseButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(confirmButton));
        expect(mockOnConfirm).toHaveBeenCalled();

        await waitFor(() => userEvent.click(refuseButton));
        expect(mockOnRefuse).toHaveBeenCalled();
    });
});