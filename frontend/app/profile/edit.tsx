import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ToastAndroid } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import TextFieldComponent from "@/components/TextFieldComponent";
import DropDownPicker from "react-native-dropdown-picker";
import { usePickerState } from "../home/(recruiter)/(vacancy)/create";
import DefaultButton from "@/components/DefaultButton";
import { getUserById, updateUser } from "@/services/userService";
import { User } from "@/types/User.interfaces";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";

function EditProfileForm() {
  const [about, setAbout] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [curriculumId, setCurriculumId] = useState<number | null>(null);

  const requirementStates = usePickerState([
    { label: "Java", value: "java" },
    { label: "Node", value: "node" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
  ]);

  const experiencesState = usePickerState([]);
  const courseState = usePickerState([]);

  const { session } = useSession();

  useEffect(() => {
    if (session?.userData.id) {
      getUserById(session.userData.id)
        .then((response) => {
          if (!response) return;

          setCurriculumId(response.curriculum.id);
          setAbout(response.curriculum.about);
          setGithub(response.curriculum.github);
          setLinkedin(response.curriculum.linkedin);
        })
        .catch(() => {
          ToastAndroid.show("Erro", 2000);
        });
    }
  }, []);

  function onSubmit() {
    const userData: User.Send.Update[] = [
      {
        path: "/tecnologies",
        value: requirementStates.value,
        op: "replace",
      },
      {
        path: "/experience",
        value: experiencesState.value,
        op: "replace",
      },
      {
        path: "/course",
        value: courseState.value,
        op: "replace",
      },
      {
        path: "/about",
        value: about,
        op: "replace",
      },
      {
        path: "/github",
        value: github,
        op: "replace",
      },
      {
        path: "/linkedin",
        value: linkedin,
        op: "replace",
      },
    ];

    if (!curriculumId) return;

    updateUser(curriculumId, userData).then((response) => {
      if (!response) {
        return;
      }
      ToastAndroid.show("Usuário atualizado!", 2000);
      router.push("/home/");
    });
  }

  return (
    <View>
      <View>
        <Text style={styles.labelTitle}>
          Recru<Text style={{ color: Colors.green }}>Tech</Text>
        </Text>
      </View>

      <View>
        <View style={styles.container}>
          <View style={styles.gapField}>
            <TextFieldComponent
              label="Sobre:"
              variant="secondary"
              multiline
              value={about}
              onChangeText={setAbout}
            />
            <View style={styles.dropdownPicker}>
              <Text style={styles.labelPicker}>Cursos:</Text>
              <DropDownPicker
                mode="BADGE"
                theme="LIGHT"
                multiple={true}
                addCustomItem={true}
                searchable={true}
                style={styles.picker}
                items={courseState.items}
                open={courseState.open}
                value={courseState.value}
                setOpen={courseState.setOpen}
                setValue={courseState.setValue}
                setItems={courseState.setItems}
                badgeDotColors={[Colors.green]}
              />
            </View>
            <View style={styles.dropdownPicker}>
              <Text style={styles.labelPicker}>Experiências:</Text>
              <DropDownPicker
                mode="BADGE"
                theme="LIGHT"
                multiple={true}
                addCustomItem={true}
                searchable={true}
                style={styles.picker}
                items={experiencesState.items}
                open={experiencesState.open}
                value={experiencesState.value}
                setOpen={experiencesState.setOpen}
                setValue={experiencesState.setValue}
                setItems={experiencesState.setItems}
                badgeDotColors={[Colors.green]}
              />
            </View>

            <TextFieldComponent
              label="GitHub"
              variant="secondary"
              value={github}
              onChangeText={setGithub}
            />

            <TextFieldComponent
              label="LinkedIn:"
              variant="secondary"
              value={linkedin}
              onChangeText={setLinkedin}
            />

            <View>
              <Text style={styles.labelPicker}>Tecnologias:</Text>
              <DropDownPicker
                mode="BADGE"
                theme="LIGHT"
                multiple={true}
                style={styles.picker}
                items={requirementStates.items}
                open={requirementStates.open}
                value={requirementStates.value}
                setOpen={requirementStates.setOpen}
                setValue={requirementStates.setValue}
                setItems={requirementStates.setItems}
                badgeDotColors={[Colors.green]}
              />
            </View>

            <View style={styles.buttonContainer}>
              <DefaultButton
                title="Apagar meu perfil"
                variant="secondary"
                moreStyles={{
                  alignSelf: "center",
                  backgroundColor: "white",
                }}
                fontSize={FontSize.small}
              />
              <DefaultButton
                title="Salvar"
                variant="secondary"
                onPress={onSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function EditProfile(): React.JSX.Element {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[{ key: "content" }]}
      style={styles.list}
      renderItem={() => <EditProfileForm />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  dropdownPicker: {
    marginBottom: Spacing.large,
  },
  labelTitle: {
    fontSize: FontSize.extraLarge,
    marginBottom: Spacing.extraSmall,
    padding: 5,
    fontFamily: "Roboto-Bold",
  },
  gapField: {
    gap: Spacing.medium,
  },
  list: {
    width: "95%",
    maxWidth: 300,
    elevation: 30,
    shadowOpacity: 0.5,
    padding: Spacing.medium,
    marginTop: Spacing.large,
    marginBottom: Spacing.large,
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: Spacing.smallMedium,
  },
  picker: {
    height: 25,
    borderRadius: 10,
  },
  labelPicker: {
    fontFamily: "Roboto-Light",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Bold",
  },
});
