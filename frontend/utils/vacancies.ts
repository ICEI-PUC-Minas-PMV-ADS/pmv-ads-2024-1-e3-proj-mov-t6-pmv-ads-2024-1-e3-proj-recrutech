import { User } from "@/types/User.interfaces";
import axios, { isAxiosError } from "axios";

export interface Vacancy {
  cvs?: null;
  id: number;
  link?: null;
  user?: User.Receive.Create;
  name: string;
  userId: number;
  benefits?: null;
  contract?: null;
  content: string;
  location: string;
  enterprise: string;
  requirements?: null;
  remuneration: string;
}

export const getVacancies = async (
  userId: string
): Promise<Vacancy[] | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Vacancies/getVacanciesByUserId";

  try {
    const response = await axios.get(`${API_URL}/${userId}`);

    return response.data;
  } catch (error) {
    isAxiosError(error);
  }
};
