import { VacancyInterfaces } from "@/types/Vacancy.interfaces";
import axios, { AxiosError } from "axios";
import { Toast } from "toastify-react-native";

const handleErrors = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      Toast.error(`Erro na solicitação: ${axiosError.response.status}`, "top");
    } else if (axiosError.request) {
      Toast.error("Sem resposta do servidor", "top");
    } else {
      Toast.error("Erro ao fazer a solicitação", "top");
    }
  } else {
    Toast.error("Erro desconhecido", "top");
  }
};

interface GetVacancies {
  min: number;
  max: number;
  // salario: boolean;
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
