import axios, { AxiosError } from "axios";

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

  export namespace Receive {
    export interface Create {
      Id: string;
      userId: string;
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
  }
};

export const createCurruculum = async (
  data: CurriculumInterfaces.Send.Create
): Promise<CurriculumInterfaces.Send.Create | void> => {
  const API_URL = "https://recrutech-webapi.azurewebsites.net/api/Cv/CreateCv";

  try {
    const response = await axios.post(API_URL, data);

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};
