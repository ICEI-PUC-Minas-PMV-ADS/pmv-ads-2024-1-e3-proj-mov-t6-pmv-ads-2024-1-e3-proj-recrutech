import { FormModel } from "@/types/Login.interfaces";
import * as yup from "yup";

const loginSchema = yup.object<FormModel>().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório!"),
  password: yup.string().required("A senha é obrigatória!"),
});

export default loginSchema;
