import api from "../api";
import { IQueryParams, IRegistration } from "./types";

const getRegistrations = (params?: IQueryParams): Promise<IRegistration[]> => 
    api.get("registrations", { params });

const putRegistration = (registration: IRegistration) => 
    api.put(`registrations/${registration.id}`, registration);

const deleteRegistration = (registrationID: string) =>
    api.delete(`registrations/${registrationID}`);

const newRegistration = (registration: IRegistration) => 
    api.post("registrations", registration);


export {getRegistrations, putRegistration, deleteRegistration, newRegistration};