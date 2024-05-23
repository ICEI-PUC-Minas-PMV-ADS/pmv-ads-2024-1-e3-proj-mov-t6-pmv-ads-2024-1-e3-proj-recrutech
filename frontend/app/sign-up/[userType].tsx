import {
  Text,
  View,
  Switch,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Link, router, useLocalSearchParams } from "expo-router";

import AppTitleComponent from "@/components/AppTitleComponent";

import { Spacing } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

import {
  ViaCepAddress,
  UserType,
  UserAddress,
  User,
} from "@/types/User.interfaces";
import TextFieldComponent, {
  getFieldVariantByUser,
} from "@/components/TextFieldComponent";
import { useState } from "react";
import DefaultButton from "@/components/DefaultButton";
import { getAdressByCep } from "@/services/adressService";
import { createUser } from "@/services/userService";
import { Toast } from "toastify-react-native";

const getAddressField = (label?: string, data?: string) => {
  return data ? (
    <View style={{ gap: 3 }}>
      <Text>{label}</Text>
      <Text style={styles.addressField}>{data}</Text>
    </View>
  ) : (
    <></>
  );
};

function SignUpForm() {
  const { userType } = useLocalSearchParams();

  const [cep, setCep] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [address, setAdress] = useState<ViaCepAddress | void>();

  const onChangeCep = (value: string) => {
    if (value.length != 8) return;

    getAdressByCep(value).then((data) => {
      setAdress(data as ViaCepAddress);
    });
  };

  const handleSwitch = (value: boolean) => {
    const newType: UserType = value ? "recruiter" : "dev";
    router.replace(`/sign-up/${newType}`);
  };

  const handleSubmit = () => {
    const data: User.Send.Create = {
      user: {
        userName: username || "",
        email: email || "",
        isRecruiter: (userType as string) === "recruiter",
        address: {
          cep: cep || "",
          logradouro: address?.logradouro || "",
          complemento: address?.complemento || "",
          bairro: address?.bairro || "",
          localidade: address?.localidade || "",
          uf: address?.uf || "",
        },
      },
      password: password || "",
    };

    createUser(data).then((response) => {
      if (response) {
        router.replace("/sign-in/dev");
        Toast.success("Usuário cadastrado com sucesso", "top");
      }
    });
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
            onChangeText={setUsername}
            label="Nome"
            placeholder="Como quer ser chamado(a)?"
            variant={fieldVariant}
          />
          <TextFieldComponent
            textContentType="emailAddress"
            onChangeText={setEmail}
            label="Email"
            placeholder="Digite seu melhor email"
            variant={fieldVariant}
          />
          <TextFieldComponent
            onChangeText={setPassword}
            label="Senha"
            placeholder="Digite sua senha"
            variant={fieldVariant}
            secureTextEntry={true}
            textContentType="password"
          />

          <TextFieldComponent
            label="CEP"
            keyboardType="numeric"
            placeholder="Informe seu CEP"
            variant={fieldVariant}
            onChangeText={onChangeCep}
          />

          <View style={styles.addressContent}>
            <View style={styles.addressSection}>
              {getAddressField("Logradouro", address?.logradouro)}
              {getAddressField("Bairro", address?.bairro)}
              {getAddressField("Complemento", address?.complemento)}
            </View>
            <View style={styles.addressSection}>
              {getAddressField("Localidade", address?.localidade)}
              {getAddressField("Uf", address?.uf)}
            </View>
          </View>
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

export default function SignUp() {
  return (
    <ScrollView>
      <SignUpForm />
    </ScrollView>
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
  addressContent: {
    width: "100%",
    gap: Spacing.medium,
  },
  addressSection: {
    gap: Spacing.medium,
    width: "100%",
  },
  addressField: {
    color: Colors.black,
    borderWidth: 1,
    padding: Spacing.small,
    fontFamily: "Roboto-Regular",
    backgroundColor: Colors.gray,
    borderRadius: Spacing.small,
    justifyContent: "space-between",
    width: "100%",
  },
});
