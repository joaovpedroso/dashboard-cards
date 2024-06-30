export enum StatusEnum {
    REPROVED = "REPROVED",
    REVIEW = "REVIEW",
    APROVED = "APROVED"
}

export interface IRegistration {
    id?: string,
    admissionDate: string,
    email: string,
    employeeName: string,
    status: StatusEnum,
    cpf: string
}

export interface IQueryParams {
    cpf?: string,
    status?: StatusEnum
}