import { LinkProps } from "expo-router";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  fontSize?: number;
  link?: LinkProps<any>["href"];
  variant?: "primary" | "secondary" | "ghost";
  moreStyles?: Record<string, string | number>;
}
