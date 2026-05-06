import { User } from "./User";

export interface JobOffer {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    salary: number;
    state: boolean;
    creator?: User;
}

// Creo el DTO para modificar
export interface JobOfferModifyInDto {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    salary: number;
    state: boolean;
    creatorId: number // Extraemos solo el ID
};