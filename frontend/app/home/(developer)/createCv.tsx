import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

import DefaultButton from "@/components/DefaultButton";
import { FontSize, Spacing } from "@/constants/Sizes";
import { useSession } from "@/context/AuthContext";
import { CurriculumInterfaces, createCurruculum } from "@/services/cvService";
import { usePickerState } from "../(recruiter)/(vacancy)/create";

function generateRandomId(): string {
  return Math.random().toString(10).substring(2, 10);
}

function goBack(): void {
  router.replace("/home/");
}

export default function CreateCV(): JSX.Element {
  const [about, setAbout] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const technologiesState = usePickerState([]);

  const { session } = useSession();

  useEffect(() => {
    if (!session || !session.userData.id) {
      router.push("/sign-in/dev");
    }
  });

  function onSubmit() {
    const formIsValid =
      about && github && linkedin && technologiesState.value.length > 0;

    if (!formIsValid) {
      return console.error("Preencha todos os campos");
    }

    const payload: CurriculumInterfaces.Send.Create = {
      Id: generateRandomId(),
      UserId: session!.userData.id,
      About: about,
      Github: github,
      Linkedin: linkedin,
      Technologies: technologiesState.value,
      IsActive: true,
    };

    createCurruculum(payload)
      .then((response) => {
        if (response) {
          goBack();
        }
      })
      .catch((_) => {
        ToastAndroid.show("Erro ao criar currículo.", 2000);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.curriculumTitle}>Adicionar currículo</Text>
      </View>

      <View style={styles.containerContent}>
        <View style={styles.curriculumField}>
          <Text style={styles.fieldLabel}>Sobre</Text>
          <TextInput
            onChangeText={setAbout}
            style={styles.fieldInput}
            placeholder="Conte-nos um pouco sobre você"
          />
        </View>
        <View style={styles.curriculumField}>
          <Text style={styles.fieldLabel}>Tecnologias</Text>
          <DropDownPicker
            mode="BADGE"
            theme="LIGHT"
            multiple={true}
            addCustomItem={true}
            searchable={true}
            style={styles.picker}
            items={technologiesState.items}
            open={technologiesState.open}
            value={technologiesState.value}
            setOpen={technologiesState.setOpen}
            setValue={technologiesState.setValue}
            setItems={technologiesState.setItems}
            badgeDotColors={[Colors.green]}
          />
        </View>
        <View style={styles.curriculumField}>
          <Text style={styles.fieldLabel}>Linkedin</Text>
          <TextInput
            onChangeText={setLinkedin}
            style={styles.fieldInput}
            placeholder="Ex: linkedin.com/user-in"
          />
        </View>
        <View style={styles.curriculumField}>
          <Text style={styles.fieldLabel}>Github</Text>
          <TextInput
            onChangeText={setGithub}
            style={styles.fieldInput}
            placeholder="Ex: github.com/user"
          />
        </View>
      </View>
      <View style={styles.containerFooter}>
        <DefaultButton
          title="Cancelar"
          variant="primary"
          onPress={goBack}
          moreStyles={{ ...styles.defaultButton }}
        />

        <DefaultButton
          title="Adicionar"
          variant="secondary"
          onPress={onSubmit}
          moreStyles={{ ...styles.defaultButton }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: Spacing.medium,
  },
  containerHeader: {
    marginBottom: Spacing.medium,
  },
  curriculumTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
    marginBottom: Spacing.medium,
  },
  containerContent: {
    width: "100%",
    gap: Spacing.medium,
  },
  curriculumField: {},
  fieldLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.small,
    marginBottom: Spacing.small,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: Spacing.small,
    borderRadius: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  picker: {
    height: Spacing.large,
    borderRadius: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  containerFooter: {
    width: "100%",
    marginTop: Spacing.medium,
    gap: Spacing.small,
    alignItems: "center",
    flexDirection: "row",
    padding: Spacing.medium,
    justifyContent: "space-between",
  },
  defaultButton: {
    width: "50%",
  },
});
