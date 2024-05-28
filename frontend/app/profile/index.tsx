import { StyleSheet, Text, ToastAndroid, View } from "react-native";

import DefaultButton from "@/components/DefaultButton";

import { Colors } from "@/constants/Colors";
import { useSession } from "@/context/AuthContext";
import { FontSize, Spacing } from "@/constants/Sizes";
import TextFieldComponent from "@/components/TextFieldComponent";
import { useEffect, useState } from "react";
import { deleteUser, getUserById } from "@/services/userService";
import { router } from "expo-router";

function getRedirectButton(isRecruiter: boolean, hasCurriculum: boolean) {
  if (isRecruiter) {
    return <></>;
  }

  if (!hasCurriculum) {
    return (
      <DefaultButton
        title="Criar currículo"
        variant="secondary"
        moreStyles={{
          width: "100%",
          maxWidth: 200,
          alignSelf: "center",
        }}
        fontSize={FontSize.small}
        link={{
          pathname: "/home/(developer)/createCv",
        }}
      />
    );
  }

  return (
    <DefaultButton
      title="Editar currículo"
      variant="secondary"
      moreStyles={{
        width: "100%",
        maxWidth: 200,
        alignSelf: "center",
      }}
      fontSize={FontSize.small}
      link={{
        pathname: "/profile/edit",
      }}
    />
  );
}

export default function Page() {
  const { session } = useSession();
  const { userName, isRecruiter, id } = session!.userData;
  const [hasCurriculum, setHasCurriculum] = useState<boolean>(true);

  const deleteAccount = async () => {
    if (session && session.userData) {
      const response = await deleteUser(session.userData.id);

      if (response) {
        ToastAndroid.show("Usuário deletado com sucesso!", 2000);
        router.push("/sign-in/dev");
      }
    }
  };

  useEffect(() => {
    getUserById(id).then((response) => {
      if (!response || !response.curriculum) return setHasCurriculum(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.labelTitle}>
        Recru<Text style={{ color: Colors.green }}>Tech</Text>
      </Text>
      <View style={styles.card}>
        <View style={styles.contentBody}>
          <Text style={styles.helloUser}>Olá, {userName}!</Text>
          <Text style={styles.edit}>Edite suas informações abaixo:</Text>
          <TextFieldComponent label="Redefinir Senha:" variant="secondary" />
          <TextFieldComponent label="E-mail:" variant="secondary" />
          <TextFieldComponent label="Endereço:" variant="secondary" />

          <View style={styles.buttonGroup}>
            {getRedirectButton(isRecruiter, hasCurriculum)}

            <DefaultButton
              title="Apagar minha conta"
              variant="secondary"
              moreStyles={{
                width: "100%",
                maxWidth: 200,
                borderWidth: 1,
                alignSelf: "center",
                backgroundColor: "white",
                borderColor: Colors.green,
              }}
              onPress={deleteAccount}
              fontSize={FontSize.small}
            />
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton
              title="Trocar de conta"
              variant="secondary"
              moreStyles={{
                alignSelf: "center",
                backgroundColor: "white",
              }}
              fontSize={FontSize.small}
              link={{
                pathname: "/sign-in/(dev)",
              }}
            />
            <DefaultButton
              title="Salvar"
              variant="secondary"
              fontSize={FontSize.small}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelTitle: {
    padding: Spacing.medium,
    fontFamily: "Roboto-Bold",
    marginTop: Spacing.medium,
    marginLeft: Spacing.medium,
    fontSize: FontSize.extraLarge,
    marginBottom: Spacing.extraSmall,
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
    maxWidth: 300,
    padding: Spacing.medium,
    marginLeft: Spacing.small,
    marginRight: Spacing.small,
    marginBottom: Spacing.medium,
    borderRadius: Spacing.medium,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    width: "95%",
    elevation: 9,
    alignSelf: "center",
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
  },
  contentBody: {
    gap: Spacing.medium,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonGroup: {
    gap: Spacing.medium,
  },
});
