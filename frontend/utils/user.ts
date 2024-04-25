import axios, { isAxiosError } from "axios";
import { Toast } from "toastify-react-native";

import { User } from "@/types/User.interfaces";

export const getUserData = async (userId: string): Promise<User | void> => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Users/getUser";

  try {
    const response = await axios.get(`${API_URL}/${userId}`);

    return response.data;
  } catch (error) {
    isAxiosError(error) &&
      Toast.error(`Erro ao obter dados do usuário: ${error.message}`, "top");
  }
};
