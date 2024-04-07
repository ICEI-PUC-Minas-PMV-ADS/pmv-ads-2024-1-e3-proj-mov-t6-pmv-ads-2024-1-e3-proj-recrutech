import { StyleSheet, View } from "react-native";

import { Slot } from "expo-router";

import { Spacing } from "@/constants/Sizes";

import HeaderComponent from "@/components/HeaderComponent";

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.small,
  },
});
