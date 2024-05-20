import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import TextFieldComponent from "@/components/TextFieldComponent";
import DropDownPicker from "react-native-dropdown-picker";
import { usePickerState } from "../home/(recruiter)/(vacancy)/create";
import DefaultButton from "@/components/DefaultButton";

function EditProfileForm() {
  const [about, setAbout] = useState("");
  const [github, setGithub] = useState("");
  const [courses, setCourses] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [experiences, setExperiences] = useState("");
  const requirementStates = usePickerState([
    { label: "Java", value: "java" },
    { label: "Node", value: "node" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
  ]);

  function onSubmit() {
    console.log({
      about,
      courses,
      experiences,
      github,
      linkedin,
      technologies: requirementStates.value,
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
            <TextFieldComponent
              label="Cursos:"
              variant="secondary"
              multiline
              value={courses}
              onChangeText={setCourses}
            />
            <TextFieldComponent
              label="ExperiÃªncias:"
              variant="secondary"
              multiline
              value={experiences}
              onChangeText={setExperiences}
            />
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
