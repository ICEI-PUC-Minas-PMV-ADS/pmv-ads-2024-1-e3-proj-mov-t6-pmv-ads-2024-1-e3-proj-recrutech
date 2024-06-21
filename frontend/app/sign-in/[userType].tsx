import { StyleSheet, Text, View, Platform, ToastAndroid } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";

import loginSchema from "@/schemas/loginSchema";

import { AuthInterfaces } from "@/types/Auth.interfaces";

import { getUserData } from "@/utils/user";
import { renderTextField } from "@/utils/renderTextField";

import { AuthContextProps, useSession } from "@/context/AuthContext";

import DefaultButton, {
  getButtonVariantByUser,
} from "@/components/DefaultButton";
import AppTitleComponent from "@/components/AppTitleComponent";
import { getFieldVariantByUser } from "@/components/TextFieldComponent";

const handleSuccessfulAuthentication = async (
  authResponse: AuthInterfaces.Receive,
  setSession: AuthContextProps["setSession"]
) => {
  const userId = authResponse.userId;
  const response = await getUserData(userId);

  if (response && response.userName) {
    setSession({
      jwtToken: authResponse.jwtToken,
      userData: {
        id: response.id,
        email: response.email,
        userName: response.userName,
        isRecruiter: response.isRecruiter,
      },
    });
  }
};

export default function Login() {
  const { userType } = useLocalSearchParams();

  const router = useRouter();
  const { signIn, setSession } = useSession();

  const fieldVariant = getFieldVariantByUser(userType);
  const buttonVariant = getButtonVariantByUser(userType);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInterfaces.Send>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AuthInterfaces.Send> = async (
    payload: AuthInterfaces.Send
  ): Promise<void> => {
    try {
      const authResponse = await signIn(payload);

      if (authResponse && authResponse.jwtToken) {
        await handleSuccessfulAuthentication(authResponse, setSession);
        router.push("/home/");
        ToastAndroid.show("Usuário logado com sucesso!", 2000);
      } else {
        ToastAndroid.show("Usuário ou senha incorretos", 2000);
      }
    } catch (error) {
      ToastAndroid.show("Erro durante a autenticação", 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <AppTitleComponent />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={(props) =>
            renderTextField({
              ...props,
              label: "Email",
              variant: fieldVariant,
              placeholder: "Digite seu email",
              error: errors.email?.message,
            })
          }
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={(props) =>
            renderTextField({
              ...props,
              label: "Senha",
              secureTextEntry: true,
              variant: fieldVariant,
              placeholder: "Digite sua senha",
              error: errors.password?.message,
            })
          }
        />
        <View style={styles.signIn}>
          <DefaultButton
            title="Entrar"
            variant={buttonVariant}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.register}>
          <Text style={styles.text}>
            Não tem uma conta?
            <Link
              href={{
                pathname: "/sign-up/[userType]",
                params: { userType: userType.toString() },
              }}
            >
              <Text style={[styles.text, styles.link]}> Cadastre-se</Text>
            </Link>
          </Text>
        </View>

        <Link href="/">
          <Text style={styles.text}>Voltar</Text>
        </Link>
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
  contentWrapper: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.medium,
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
  signIn: {
    alignItems: "center",
    gap: Spacing.medium,
    marginVertical: Spacing.smallMedium,
  },
  register: {
    alignItems: "center",
    gap: Spacing.small,
    marginVertical: Spacing.smallMedium,
  },
  link: {
    color: Colors.blue,
  },
  text: {
    color: Colors.black,
    fontFamily: "Roboto-Regular",
  },
  error: {
    color: Colors.red,
    alignSelf: "flex-start",
    paddingLeft: Spacing.small,
  },
});
