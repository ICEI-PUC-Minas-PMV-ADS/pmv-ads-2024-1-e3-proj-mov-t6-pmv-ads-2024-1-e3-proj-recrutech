import Login from "@/app/login/[userType]";
import { LoginInterfaces } from "./Login.interfaces";

export interface AuthService {
  login: (
    data: LoginInterfaces.Send
  ) => Promise<LoginInterfaces.Receive | void>;
}
