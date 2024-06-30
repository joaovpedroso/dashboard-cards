import { z } from "zod";
import { isValidName } from "~/utils/strings";
import { isValidDate } from "~/utils/validators";

const UserSchema = z.object({
    employeeName: z.string({ message: "Campo obrigatório" }).min(2, "Você precisa de no mínimo 2 caracteres").refine(isValidName, "Nome inválido"),
    email: z.string({ message: "Email inválido" }).email("Email inválido"),
    cpf: z.string({ message: "Campo obrigatório" }).min(3, "Campo obrigatório" ),
    admissionDate: z.string({ message: "Campo obrigatório" }).date("Data inválida").refine(isValidDate, "A data não pode ser maior que o dia atual"),
});

export { UserSchema };