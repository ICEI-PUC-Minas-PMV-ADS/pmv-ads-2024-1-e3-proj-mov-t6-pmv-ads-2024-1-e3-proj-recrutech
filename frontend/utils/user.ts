import axios, { isAxiosError } from "axios";
import { Toast } from "toastify-react-native";

export const getUserData = async (userToken: string) => {
  const API_URL =
    "https://recrutech-webapi.azurewebsites.net/api/Users/getUser/3";

  try {
    const response = await axios.get(`${API_URL}`);

    return response.data;
  } catch (error) {
    isAxiosError(error) &&
      Toast.error(`Erro ao obter dados do usuário: ${error.message}`, "top");
  }
};
