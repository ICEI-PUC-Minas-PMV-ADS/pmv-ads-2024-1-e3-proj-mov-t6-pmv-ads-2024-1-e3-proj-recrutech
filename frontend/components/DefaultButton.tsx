import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Link } from "expo-router";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { ButtonProps } from "@/types/DefaultButton.interfaces";

function ButtonText({ title, variant }: Partial<ButtonProps>): JSX.Element {
  return (
    <Text style={[styles.text, variant === "secondary" && styles.textBlack]}>
      {title}
    </Text>
  );
}

export function getButtonVariantByUser(
  usertype: string | string[]
): ButtonProps["variant"] {
  return usertype === "dev" ? "secondary" : "primary";
}

export default function DefaultButton({
  link,
  title,
  variant,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.bgGreen]}
      onPress={onPress}
    >
      {link ? (
        <Link href={link} style={[styles.link]}>
          {ButtonText({ title, variant })}
        </Link>
      ) : (
        ButtonText({ title, variant })
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    color: Colors.white,
    padding: Spacing.small,
    justifyContent: "center",
    backgroundColor: Colors.black,
    borderRadius: Spacing.smallMedium,
  },
  link: {
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  bgGreen: {
    backgroundColor: Colors.green,
  },
  textBlack: {
    color: Colors.black,
  },
});
