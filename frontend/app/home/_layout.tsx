import { StyleSheet, View } from "react-native";

import { Slot, router } from "expo-router";

import { Spacing } from "@/constants/Sizes";

import HeaderComponent from "@/components/HeaderComponent";
import { useStorageState } from "@/hooks/useStorageState";

export default function HomeLayout() {
  const [session] = useStorageState("session");

  if (!session) {
    router.replace("/sign-in/dev");
  }

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
