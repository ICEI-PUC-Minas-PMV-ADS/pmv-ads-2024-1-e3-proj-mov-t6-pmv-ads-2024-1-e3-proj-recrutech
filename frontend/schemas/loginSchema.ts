import * as yup from "yup";

import { AuthInterfaces } from "@/types/Auth.interfaces";

const loginSchema = yup.object<AuthInterfaces.Send>().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório!"),
  password: yup.string().required("A senha é obrigatória!"),
});

export default loginSchema;
