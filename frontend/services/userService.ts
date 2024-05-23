import axios, { isAxiosError } from "axios";
import { Toast } from "toastify-react-native";

import { User } from "@/types/User.interfaces";

const handleErrors = (error: unknown) => {
  if (isAxiosError(error)) {
    Toast.error(`Erro ao obter usuários: ${error.message}`, "top");
  }
};

export const getUsers = async (
  name?: string
): Promise<User.Receive.Create[] | void> => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Users/getAllUsers${
    name ? "?name=" + name : ""
  }`;

  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const getUserById = async (
  id: number
): Promise<User.Receive.Create | void> => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Users/getUser/${id}`;

  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const updateUser = async (id: number, userData: User.Send.Update[]) => {
  const API_URL = `https://recrutech-webapi.azurewebsites.net/api/Cv/UpdateCv/${id}`;

  try {
    const response = await fetch(API_URL, {
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    handleErrors(error);
  }
};
