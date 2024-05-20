import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import ToastManager from "toastify-react-native";
import TextFieldComponent, {
  getFieldVariantByUser,
} from "@/components/TextFieldComponent";
import DefaultButton, {
  getButtonVariantByUser,
} from "@/components/DefaultButton";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { usePickerState } from "../home/(recruiter)/(vacancy)/create";

function EditProfileForm() {
  const requirementStates = usePickerState([
    { label: "Java", value: "java" },
    { label: "Node", value: "node" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
  ]);

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
            <TextFieldComponent label="Sobre:" variant="secondary" multiline />
            <TextFieldComponent label="Cursos:" variant="secondary" multiline />
            <TextFieldComponent
              label="Experiências:"
              variant="secondary"
              multiline
            />
            <TextFieldComponent label="GitHub" variant="secondary" />

            <TextFieldComponent label="LinkedIn:" variant="secondary" />

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
              <DefaultButton title="Salvar" variant="secondary" />
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
    alignItems: "center",
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

  newVacancie: {
    marginLeft: 10,
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
    alignSelf: "center",
    fontFamily: "Roboto-Bold",
    marginTop: 30,
  },
});
