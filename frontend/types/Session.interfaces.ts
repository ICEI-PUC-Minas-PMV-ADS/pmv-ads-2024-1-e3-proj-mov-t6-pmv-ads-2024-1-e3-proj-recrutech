import { User } from "./User.interfaces";

export interface Session {
  jwtToken: string;
  userData: Pick<User, "id" | "email" | "userName" | "isRecruiter">;
}
