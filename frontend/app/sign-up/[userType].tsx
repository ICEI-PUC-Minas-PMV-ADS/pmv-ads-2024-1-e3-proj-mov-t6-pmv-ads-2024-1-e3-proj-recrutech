import { Text, View, Switch, Platform, StyleSheet } from "react-native";

import { Link, router, useLocalSearchParams } from "expo-router";

import AppTitleComponent from "@/components/AppTitleComponent";

import { Spacing } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

import { UserType } from "@/types/User.interfaces";
import TextFieldComponent, {
  getFieldVariantByUser,
} from "@/components/TextFieldComponent";
import DefaultButton from "@/components/DefaultButton";

export default function SignUp() {
  const { userType } = useLocalSearchParams();

  const handleSwitch = (value: boolean) => {
    const newType: UserType = value ? "recruiter" : "dev";
    router.replace(`/sign-up/${newType}`);
  };

  const handleSubmit = () => {
    console.log("Submit");
  };

  const fieldVariant = getFieldVariantByUser(userType);
  const buttonVariant = getFieldVariantByUser(userType);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppTitleComponent />

        <View style={styles.contentHeader}>
          <Text style={{ color: Colors.black }}>
            Sou {userType === "dev" ? "candidato" : "recrutador"}
          </Text>
          <Switch
            value={userType === "recruiter"}
            onValueChange={handleSwitch}
            trackColor={{ true: Colors.gray, false: Colors.gray }}
            thumbColor={userType === "recruiter" ? Colors.black : Colors.green}
          />
        </View>

        <View style={styles.contentBody}>
          <TextFieldComponent
            label="Nome"
            placeholder="Como quer ser chamado(a)?"
            variant={fieldVariant}
          />
          <TextFieldComponent
            label="Email"
            placeholder="Digite seu melhor email"
            variant={fieldVariant}
          />
          <TextFieldComponent
            label="Senha"
            placeholder="Digite sua senha"
            variant={fieldVariant}
            secureTextEntry={true}
          />
          <TextFieldComponent
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            variant={fieldVariant}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.contentFooter}>
          <Link href={`/sign-in/${userType}`}>
            <Text style={{ color: Colors.black }}>Já tenho uma conta</Text>
          </Link>

          <DefaultButton
            title="Cadastrar"
            variant={buttonVariant}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.small,
    padding: Spacing.medium,
    borderRadius: Spacing.medium,
    backgroundColor: Colors.white,

    ...Platform.select({
      ios: {
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 20,
      },
    }),
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.medium,
  },
  contentBody: {
    width: "100%",
    gap: Spacing.medium,
  },
  contentFooter: {
    width: "100%",
    gap: Spacing.medium,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.large,
  },
});
