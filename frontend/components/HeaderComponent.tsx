import { Image, StyleSheet, Text, View } from "react-native";

import AppTitle from "./AppTitleComponent";

import { Spacing } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

export default function HeaderComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View>
          <AppTitle size={Spacing.large}></AppTitle>
          <Text style={styles.titleSuffix}>for recruiters</Text>
        </View>
        <View>
          <Image source={require("@/assets/images/profile.png")} />
        </View>
      </View>

      <Text style={styles.greetingText}>
        <Text style={styles.textGreen}>Bem vindo,</Text> recrutador!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Spacing.large,
    justifyContent: "space-between",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleSuffix: {
    alignSelf: "flex-end",
    fontFamily: "Roboto-Bold",
    fontSize: Spacing.smallMedium,
  },
  greetingText: {
    fontSize: Spacing.medium,
    fontFamily: "Roboto-Bold",
    marginTop: Spacing.large,
    paddingLeft: Spacing.small,
  },
  textGreen: {
    color: Colors.green,
  },
});
