import axios, { AxiosError } from "axios";
import { Toast } from "toastify-react-native";

export namespace CurriculumInterfaces {
  export namespace Send {
    export interface Create {
      Id: string;
      UserId: string;
      About: string;
      Github: string;
      Linkedin: string;
      Technologies: string[];
      IsActive: boolean;
    }
  }
}

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

export const createCurruculum = async (
  data: CurriculumInterfaces.Send.Create
): Promise<void> => {
  const API_URL = "https://recrutech-webapi.azurewebsites.net/api/Cv/CreateCv";

  try {
    const response = await axios.post(API_URL, data);

    Toast.success("Currículo criado com sucesso!", "Top");

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};
