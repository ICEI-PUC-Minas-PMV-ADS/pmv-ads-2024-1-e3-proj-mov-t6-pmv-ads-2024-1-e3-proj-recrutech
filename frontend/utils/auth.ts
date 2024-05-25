import { router } from "expo-router";
import axios, { isAxiosError } from "axios";

import { AuthInterfaces } from "@/types/Auth.interfaces";

export const signIn = async ({
  email,
  password,
}: AuthInterfaces.Send): Promise<AuthInterfaces.Receive | void> => {
  const API_URL: string =
    "https://recrutech-webapi.azurewebsites.net/api/Users/loginWithAuth";

  try {
    const response = await axios.post(`${API_URL}`, {
      email,
      senha: password,
    });

    return response.data;
  } catch (error) {
    isAxiosError(error);
  }
};

export const signOut = (): void => {
  router.push("/");
};
