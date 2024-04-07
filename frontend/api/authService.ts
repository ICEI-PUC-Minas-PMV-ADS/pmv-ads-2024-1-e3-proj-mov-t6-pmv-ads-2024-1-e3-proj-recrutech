import axios, { isAxiosError } from "axios";

import { Toast } from "toastify-react-native";

import { LoginInterfaces } from "@/types/Login.interfaces";
import { AuthService } from "@/types/AuthService.interface";

export const authService = (): AuthService => {
  const API_URL: string =
    "https://recrutech-webapi.azurewebsites.net/api/Users/Login";

  return {
    login: async ({
      email,
      password,
    }: LoginInterfaces.Send): Promise<LoginInterfaces.Receive | void> => {
      try {
        const response = await axios.post(`${API_URL}`, {
          email,
          senha: password,
        });

        if (response.data) {
          return response.data;
        }
      } catch (error) {
        isAxiosError(error) &&
          Toast.error(`Erro ao fazer login: ${error}`, "top");
      }
    },
  };
};
