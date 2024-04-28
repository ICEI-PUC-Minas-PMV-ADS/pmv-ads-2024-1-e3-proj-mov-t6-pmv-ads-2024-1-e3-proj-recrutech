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
  variant = "primary",
  onPress,
  moreStyles,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.button,
        variant === "secondary" && styles.bgGreen,
        moreStyles,
      ]}
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
    justifyContent: "center",
    borderRadius: Spacing.small,
    backgroundColor: Colors.black,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
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
