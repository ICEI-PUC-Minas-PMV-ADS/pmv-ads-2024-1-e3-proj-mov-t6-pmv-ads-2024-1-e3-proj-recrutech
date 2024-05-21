import axios, { isAxiosError } from "axios";
import { Toast } from "toastify-react-native";

import { User } from "@/types/User.interfaces";

const handleErrors = (error: unknown) => {
  isAxiosError(error) &&
    Toast.error(`Erro ao obter usuários: ${error.message}`, "top");
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
