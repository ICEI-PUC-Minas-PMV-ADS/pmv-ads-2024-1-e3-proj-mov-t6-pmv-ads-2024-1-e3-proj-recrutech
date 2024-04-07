export namespace LoginInterfaces {
  export interface Send {
    email: string;
    password: string;
  }

  export interface Receive {
    token: string;
  }
}

export interface RenderTextFieldProps {
  field: any;
  label: string;
  error?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  variant: "primary" | "secondary" | undefined;
}
