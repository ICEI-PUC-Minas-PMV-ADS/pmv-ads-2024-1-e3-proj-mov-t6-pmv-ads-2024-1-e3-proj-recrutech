import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { Spacing } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

import { useSession } from "@/context/AuthContext";

import AppTitle from "./AppTitleComponent";
import AvatarWithDropdown from "./AvatarWithDropdownComponent";

export default function HeaderComponent() {
  const { session } = useSession();
  const { userName, isRecruiter } = session?.userData || {};

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View>
          <AppTitle size={Spacing.large} />
          {isRecruiter && (
            <Text style={styles.titleSuffix}>for recruiters</Text>
          )}
        </View>
        <AvatarWithDropdown userPhoto="https://avatars.githubusercontent.com/u/39444716?v=4" />
      </View>

      <Text style={styles.greetingText}>
        <Text style={styles.textGreen}>Bem vindo, </Text>
        {userName || "Usuário"}
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
