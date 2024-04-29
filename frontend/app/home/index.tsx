<<<<<<< HEAD

import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
=======
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";
import { useSession } from "@/context/AuthContext";
>>>>>>> 3d0bf2e33c312f56b942210f120c159f5f94ca32

import * as SplashScreen from "expo-splash-screen";

<<<<<<< HEAD
import { initializeFonts } from "@/utils/helpers";

import AppTitle from "@/components/AppTitleComponent";
import DefaultButton from "@/components/DefaultButton";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { fontsLoaded, fontError } = initializeFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.mainContainer} onLayout={onLayoutRootView}>
      <View style={styles.headerContainer}>
        <Text style={styles.defaultText}>Bem vindo(a) ao</Text>
        <AppTitle />
        <Text style={styles.defaultText}>Como podemos te ajudar hoje?</Text>
      </View>

      <View style={styles.bodyContainer}>
        <DefaultButton
          title="Procuro vagas"
          variant="secondary"
          link={{
            pathname: "/login/[userType]",
            params: { userType: "dev" },
          }}
        />
        <DefaultButton
          title="Quero contratar"
          link={{
            pathname: "/login/[userType]",
            params: { userType: "recruiter" },
          }}
        />
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.image}
        />
=======
export default function Home() {
  const { session } = useSession();
  const { userName, isRecruiter } = session?.userData || {};

  return (
    <View>
      <Text style={styles.greetingText}>
        <Text style={styles.textGreen}>Bem vindo, </Text>
        {userName || "Usuário"}
      </Text>
      <View style={styles.container}>
        {isRecruiter ? <RecruiterHomePage /> : <DeveloperHomePage />}
>>>>>>> 3d0bf2e33c312f56b942210f120c159f5f94ca32
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.extraLarge,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  headerContainer: {
    alignItems: "center",
    gap: Spacing.medium,
  },
  bodyContainer: {
    gap: Spacing.smallMedium,
    maxWidth: 200,
  },
  defaultText: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  appTitle: {
    color: Colors.blue,
    fontWeight: "bold",
    fontSize: FontSize.extraLarge,
  },
  titleSuffix: {
    color: Colors.green,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: Spacing.extraLarge,
  },
  greetingText: {
    fontSize: Spacing.medium,
    fontFamily: "Roboto-Bold",
    marginTop: Spacing.large,
    paddingLeft: Spacing.small,
    textAlign: "left",
  },
  textGreen: {
    color: Colors.green,
  },
});
