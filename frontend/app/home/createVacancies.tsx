import React from "react";
import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import TextFieldComponent, {
  getFieldVariantByUser,
} from "@/components/TextFieldComponent";
import DefaultButton, {
  getButtonVariantByUser,
} from "@/components/DefaultButton";
import { Picker } from "@react-native-picker/picker";


export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelTitle}>
          Recru<Text style={{ color: Colors.green }}>Tech</Text>
        </Text>
        <Text style={styles.titleFooter}> for Recruiters</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.contentBody}>
            <TextFieldComponent label="Título:" />
            <TextFieldComponent label="Empresa:" />
            <TextFieldComponent
              label="Cargo:"
              placeholder="Fullstack developer"
              placeholderTextColor={Colors.gray}
            />
            <TextFieldComponent label="Local" />

            <View>
            <label style={styles.labelPicker}>Tipo de contrato</label>
              <Picker style={styles.picker} >
              <Picker.Item label="Selecione" value="select" />
                <Picker.Item label="CLT" value="clt" />
                <Picker.Item label="PJ" value="pj" />
                <Picker.Item label="Estágio" value="estagio" />
              </Picker>
            </View>

            <TextFieldComponent label="Descrição e requisitos:" multiline />

            <TextFieldComponent label="Benefícios:" multiline />

            <TextFieldComponent label="Salário:" />

            <View >
              <label style={styles.labelPicker}>Tecnologias</label>
              <Picker style={styles.picker} >
              <Picker.Item label="Selecione" value="select" />
                <Picker.Item label="Go" value="go" />
                <Picker.Item label="C#" value="csharp" />
                <Picker.Item label="JAVA" value="java" />
              </Picker>
            </View>

           

            <View style={styles.buttonContainer}>
              <DefaultButton title="Voltar" />

              <DefaultButton title="Finalizar" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    marginBottom: 100,
  },
  inputContainer: {
    width: "100%",
    marginBottom: Spacing.medium,
  },
  labelTitle: {
    fontSize: FontSize.extraLarge,
    marginBottom: Spacing.extraSmall,
    padding: 5,
    fontFamily: "Roboto-Bold",
  },
  Inputlabel: {
    fontSize: FontSize.small,
    marginLeft: 30,
    marginTop: 20,
    gap: 10,
  },
  Inputlabel2: {
    fontSize: FontSize.small,
    marginLeft: 30,
    marginTop: 20,
    gap: 10,
  },
  titleFooter: {
    fontSize: 10,
    marginTop: -16,
    marginLeft: 83,
    fontFamily: Colors.black,
  },
  input: {
      height: 30,
      marginTop: 0,
      width: "90%",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
      color: Colors.gray,
      borderColor: Colors.black, 
      fontSize: FontSize.medium,
      backgroundColor: Colors.white,
      paddingVertical: Spacing.small,
      paddingHorizontal: Spacing.medium,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
   
  },
  card: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
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
  },
  newVacancie: {
    marginLeft: 10,
  },
  picker:{
    height: 35,
    borderRadius: 10,
  },
  labelPicker:{
    fontFamily: "Roboto-Light",
  },
  contentBody: {
    width: "95%",
    gap: Spacing.medium,
    marginLeft:7
  },
  buttonContainer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    gap: 50,
    marginRight: "90%",
    marginLeft: "20%",
    fontFamily: "Roboto-Bold",
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
 
});
