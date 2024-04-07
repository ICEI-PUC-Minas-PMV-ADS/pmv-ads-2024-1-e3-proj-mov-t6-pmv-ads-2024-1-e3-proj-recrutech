import { StyleSheet, Text, View, Platform } from "react-native";

import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { Toast } from "toastify-react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { authService } from "@/api/authService";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";

import loginSchema from "@/schemas/loginSchema";

import DefaultButton, {
  getButtonVariantByUser,
} from "@/components/DefaultButton";
import TextField, {
  getFieldVariantByUser,
} from "@/components/TextFieldComponent";
import AppTitleComponent from "@/components/AppTitleComponent";

import {
  LoginInterfaces,
  RenderTextFieldProps,
} from "@/types/Login.interfaces";
import ToastComponent from "@/components/ToastComponent";

const renderTextField = ({
  field: { onChange, value },
  label,
  error,
  variant,
  placeholder,
  secureTextEntry,
}: RenderTextFieldProps): React.JSX.Element => (
  <>
    <TextField
      {...{ label, value, variant, placeholder, secureTextEntry }}
      onChangeText={onChange}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

export default function Login() {
  const { login } = authService();
  const { userType } = useLocalSearchParams();

  const router = useRouter();
  const fieldVariant = getFieldVariantByUser(userType);
  const buttonVariant = getButtonVariantByUser(userType);

  const defaultValues: LoginInterfaces.Send = {
    email: "email@meuemail.com",
    password: "senha",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterfaces.Send>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginInterfaces.Send> = async (
    payload: LoginInterfaces.Send
  ): Promise<void> => {
    const response = await login(payload);

    if (response) {
      Toast.success("Login efetuado com sucesso!", "top");

      setTimeout(() => {
        router.push("/home/");
      }, 1500);
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
          <Text style={styles.text}>Esqueci minha senha</Text>
        </View>

        <View style={styles.register}>
          <Text style={styles.text}>
            Não tem uma conta?
            <Link
              href={{
                pathname: "/signup/[userType]",
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
      <ToastComponent />
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
