export namespace AuthInterfaces {
  export interface Send {
    email: string;
    password: string;
  }

  export interface Receive {
    jwtToken: string;
    userId: string;
  }
}

export interface AuthService {
  signIn: (data: AuthInterfaces.Send) => Promise<AuthInterfaces.Receive | void>;
  signOut: () => void;
}

export interface RenderTextFieldProps {
  field: any;
  label: string;
  error?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  variant: "primary" | "secondary" | undefined;
}
