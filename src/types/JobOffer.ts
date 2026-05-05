import { User } from "./User";

export interface JobOffer {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string | null;
    salary: number;
    state: boolean;
    creator?: User; 
}