import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { initializeFonts } from "@/utils/helpers";

import AppTitle from "@/components/AppTitleComponent";
import DefaultButton from "@/components/DefaultButton";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import TextFieldComponent from "@/components/TextFieldComponent";

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
    <View>
      <Text style={styles.labelTitle}>
        Recru<Text style={{ color: Colors.green }}>Tech</Text>
      </Text>
      <View style={styles.card}>
        <View style={styles.contentBody}>
          <Text style={styles.helloUser}>Olá, Samuel!</Text>
          <Text style={styles.edit}>Edite suas informações abaixo:</Text>
          <TextFieldComponent label="Redefinir Senha:" variant="secondary" />
          <TextFieldComponent label="E-mail:" variant="secondary" />
          <TextFieldComponent label="Endereço:" variant="secondary" />

          {/* Adicionei dois pontos para indicar o rótulo */}

          <View style={styles.buttonGroup}>
            <DefaultButton
              title="Editar Perfil"
              variant="secondary"
              moreStyles={{
                width: 200,
                height: 50,
                alignSelf: "center",
              }}
            />
            <DefaultButton
              title="Apagar minha conta"
              variant="secondary"
              moreStyles={{
                width: 200,
                height: 50,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: Colors.green,
                backgroundColor: "white",
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton
              title="Trocar de conta"
              variant="secondary"
              moreStyles={{
                width: 200,
                height: 50,
                alignSelf: "center",
                backgroundColor: "white",
              }}
            />
            <DefaultButton title="Salvar" variant="secondary" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelTitle: {
    fontSize: FontSize.extraLarge,
    marginBottom: Spacing.extraSmall,
    marginTop: Spacing.medium,
    marginLeft: Spacing.medium,
    padding: 5,
    fontFamily: "Roboto-Bold",
  },
  helloUser: {
    fontSize: FontSize.mediunLarge,
    fontFamily: "Roboto-Bold",
  },
  edit: {
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Regular",
  },
  card: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: Spacing.small,
    marginRight: Spacing.small,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginBottom: Spacing.medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 9,
    width: "95%",
    alignSelf: "center", // centralizar horizontalmente
  },
  contentBody: {
    width: "95%",
    gap: Spacing.medium,
    marginLeft: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // Ajuste o espaçamento conforme necessário
  },
  buttonGroup: {
    gap: 15, // Espaçamento entre os botões
    marginBottom: 40,
    textAlign: "center",
    width: "100%",
  },
});
