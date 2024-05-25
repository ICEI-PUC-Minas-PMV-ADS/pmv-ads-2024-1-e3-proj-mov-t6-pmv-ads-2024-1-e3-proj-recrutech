import { VacancyInterfaces } from "@/types/Vacancy.interfaces";
import axios, { AxiosError } from "axios";

const handleErrors = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
    } else if (axiosError.request) {
    } else {
    }
  } else {
  }
};

interface GetVacancies {
  min: number;
  max: number;
  estagio: boolean;
  junior: boolean;
  pleno: boolean;
  senior: boolean;
  local?: string;
}

export const getVacancies = async (
  data: GetVacancies
): Promise<VacancyInterfaces.Receive.List[] | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Vacancies/getVacanciesFilter";

  try {
    const response = await axios.get(API_URL, {
      params: data,
    });
    return response.data as VacancyInterfaces.Receive.List[];
  } catch (error) {
    handleErrors(error);
  }
};
