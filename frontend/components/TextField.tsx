import { Text, View, TextInput, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { TextFieldProps } from "@/types/TextField.interfaces";

export default function TextField({
  label,
  variant,
  secureTextEntry,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, variant === "secondary" && styles.borderGreen]}
        {...{ secureTextEntry }}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.extraSmall,
  },
  label: {
    color: Colors.black,
    fontSize: FontSize.small,
  },
  input: {
    borderWidth: 1,
    fontSize: FontSize.small,
    borderColor: Colors.black,
    paddingHorizontal: Spacing.medium,
    borderRadius: Spacing.smallMedium,
    paddingVertical: Spacing.extraSmall,
  },
  borderGreen: {
    borderColor: Colors.green,
  },
});
