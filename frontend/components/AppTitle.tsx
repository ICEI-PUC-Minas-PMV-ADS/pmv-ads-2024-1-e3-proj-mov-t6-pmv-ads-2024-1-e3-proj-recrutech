import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize } from "@/constants/Sizes";

import { AppTitleProps } from "@/types/AppTitle.interfaces";

export default function AppTitle({
  size = FontSize.extraLarge,
}: AppTitleProps) {
  return (
    <Text
      style={{
        ...styles.appTitle,
        fontSize: size,
      }}
    >
      <Text>Recru</Text>
      <Text style={styles.titleSuffix}>Tech</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.black,
    fontSize: FontSize.extraLarge,
  },
  titleSuffix: {
    color: Colors.green,
  },
});
