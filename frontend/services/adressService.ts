import axios, { AxiosError } from "axios";
import { Toast } from "toastify-react-native";

export interface Address {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const getAdressByCep = async (cep: string): Promise<Address | void> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response && response.data) {
      const { data } = response;

      return {
        logradouro: data.logradouro,
        complemento: data.complemento,
        localidade: data.localidade,
        bairro: data.bairro,
        uf: data.uf,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      Toast.error("CEP inválido", "top");
    }
  }
};
