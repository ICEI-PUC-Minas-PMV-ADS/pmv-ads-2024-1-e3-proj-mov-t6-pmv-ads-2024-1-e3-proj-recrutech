import { AuthService } from "@/types/AuthService.interface";
import axios, { isAxiosError } from "axios";

export const authService = (): AuthService => {
  const API_URL = "https://recrutech-webapi.azurewebsites.net/api/Users/Login";

  return {
    login: async (email: string, password: string) => {
      try {
        const response = await axios.post(`${API_URL}`, {
          email,
          senha: password,
        });

        if (response.data) {
          console.log(response.data);
        }
      } catch (error) {
        isAxiosError(error) &&
          console.error("Error fetching data: ", error.response?.data);
      }
    },
  };
};
