export interface FormModel {
  email: string;
  password: string;
}

export interface RenderTextFieldProps {
  field: any;
  label: string;
  error?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  variant: "primary" | "secondary" | undefined;
}
