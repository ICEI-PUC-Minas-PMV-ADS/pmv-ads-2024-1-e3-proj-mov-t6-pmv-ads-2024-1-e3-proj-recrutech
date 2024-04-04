import { LinkProps } from "expo-router";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  link?: LinkProps<any>["href"];
  variant?: "primary" | "secondary";
}
