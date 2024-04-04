import { TextInputProps } from "react-native";

export interface TextFieldProps extends TextInputProps {
  label: string;
  secureTextEntry?: boolean;
  variant?: "primary" | "secondary";
}
