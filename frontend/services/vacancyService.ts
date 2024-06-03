import axios, { isAxiosError } from "axios";

import { VacancyInterfaces } from "@/types/Vacancy.interfaces";
import { ToastAndroid } from "react-native";

const handleErrors = (error: unknown) => {
  if (isAxiosError(error)) {
    ToastAndroid.show(error.message, 2000);
  }
};

export const getVacancies = async (
  name?: string
): Promise<VacancyInterfaces.Receive.Create[] | void> => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Vacancies/GetAllVacancies${
    name ? "?name=" + name : ""
  }`;

  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const getVacancyById = async (
  vacancyId: string
): Promise<VacancyInterfaces.Receive.Create | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Vacancies/getVacancieById";

  try {
    const response = await axios.get(`${API_URL}/${vacancyId}`);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const getVacanciesByUserId = async (
  userId: string
): Promise<VacancyInterfaces.Receive.List[] | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Vacancies/getVacanciesByUserId";

  try {
    const response = await axios.get(`${API_URL}/${userId}`);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const createVacancy = async (
  vacancy: VacancyInterfaces.Send.Create
): Promise<VacancyInterfaces.Receive.Create | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Vacancies/CreateVacancies";

  try {
    const response = await axios.post(API_URL, vacancy);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const applyCvToVacancy = async (
  vacancyId: string,
  cvId: string
): Promise<VacancyInterfaces.Receive.Create | void> => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Vacancies/ApplyCvToVacancy?vacancyId=${vacancyId}&userId=${cvId}`;

  try {
    const response = await axios.post(API_URL);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const updateVacancy = async (
  vacancyId: string,
  updatedData: VacancyInterfaces.Send.Update[]
): Promise<VacancyInterfaces.Receive.Create | void> => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Vacancies/updateVacancy/${vacancyId}`;

  try {
    // const response = await axios.patch(API_URL, updatedData);
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json-patch+json" },
      body: JSON.stringify(updatedData),
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);

    return parsedResponse.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const deleteVacancy = async (vacancyId: string) => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Vacancies/${vacancyId}`;

  try {
    return await axios.delete(API_URL);
  } catch (error) {
    handleErrors(error);
  }
};
