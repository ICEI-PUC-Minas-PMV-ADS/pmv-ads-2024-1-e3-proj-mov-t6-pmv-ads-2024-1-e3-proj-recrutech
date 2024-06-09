import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";
import TextFieldComponent from "@/components/TextFieldComponent";

import { RenderTextFieldProps } from "@/types/Auth.interfaces";

export const renderTextField = ({
  field: { onChange, value },
  label,
  error,
  variant,
  placeholder,
  secureTextEntry,
}: RenderTextFieldProps): React.JSX.Element => (
  <>
    <TextFieldComponent
      key={label}
      {...{ label, value, variant, placeholder, secureTextEntry }}
      onChangeText={onChange}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

const styles = StyleSheet.create({
  error: {
    color: Colors.red,
    alignSelf: "flex-start",
    paddingLeft: Spacing.small,
  },
});
