import * as yup from "yup";

import {
  Office,
  Contract,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";

const createVacancySchema = yup.object<VacancyInterfaces.Send.Create>().shape({
  name: yup.string().required("Nome da vaga obrigatório"),
  link: yup.string().required("Link obrigatório"),
  cargo: yup.mixed<Office>().required("Cargo obrigatório"),
  userId: yup.string().required("Usuário obrigatório"),
  contract: yup.mixed<Contract>().required("Contrato obrigatório"),
  enterprise: yup.string().required("Empresa obrigatória"),
  location: yup.string().required("Localização obrigatória"),
  remuneration: yup.string().required("Remuneração obrigatória"),
  content: yup.string().required("A vaga deve conter uma descrição"),
  benefits: yup.array().required("Benefícios obrigatórios"),
  requirements: yup.array().required("Requisitos obrigatórios"),
});

export default createVacancySchema;
