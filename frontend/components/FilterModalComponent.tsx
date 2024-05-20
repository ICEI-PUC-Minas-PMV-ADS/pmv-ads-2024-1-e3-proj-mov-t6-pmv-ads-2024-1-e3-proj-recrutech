import { getVacancies } from "@/services/filterService";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";

const FilterModalComponent = ({
  setVacancies,
  modalVisible,
  setModalVisible,
}: {
  setVacancies: Function;
  modalVisible: boolean;
  setModalVisible: Function;
}) => {
  const [isJunior, setJunior] = useState(true);
  const [isPleno, setPleno] = useState(true);
  const [isSenior, setSenior] = useState(true);
  const [isEstagio, setEstagio] = useState(true);
  const [salario, setSalario] = useState(1);
  const [location, setLocation] = useState("");

  const filtrarVagas = () => {
    getVacancies({
      estagio: isEstagio,
      junior: isJunior,
      pleno: isPleno,
      senior: isSenior,
      max: salario,
      min: 0,
      local: location,
    }).then((Response) => {
      setVacancies(Response);
      setModalVisible(false);
    });
  };

  const resetarFiltros = () => {
    setEstagio(false);
    setJunior(false);
    setPleno(false);
    setSenior(false);
    setSalario(1);
    setLocation("");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filtros</Text>
            <Pressable onPress={resetarFiltros} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Redefinir</Text>
            </Pressable>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Tipo:</Text>
              <View style={styles.checkboxContainer}>
                <Checkbox value={isEstagio} onValueChange={setEstagio} />
                <Text style={styles.checkboxLabel}>Estágio</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox value={isJunior} onValueChange={setJunior} />
                <Text style={styles.checkboxLabel}>Júnior</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox value={isPleno} onValueChange={setPleno} />
                <Text style={styles.checkboxLabel}>Pleno</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox value={isSenior} onValueChange={setSenior} />
                <Text style={styles.checkboxLabel}>Sênior</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Localização"
                  value={location}
                  style={styles.input}
                  onChange={(event) => {
                    setLocation(event.nativeEvent.text);
                  }}
                />
              </View>
              <Slider
                value={salario}
                onValueChange={(value) => {
                  setSalario(Number(value.toFixed(0)));
                }}
                style={{ width: 200, height: 40 }}
                minimumValue={1}
                maximumValue={20000}
                minimumTrackTintColor="#2DC672"
                maximumTrackTintColor="#000000"
              />
              <Text style={styles.salaryText}>R${salario},00</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={filtrarVagas}
                >
                  <Text style={styles.textStyle}>Salvar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FF5C5C",
  },
  buttonSave: {
    backgroundColor: "#2DC672",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2DC672",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  filterGroup: {
    width: "100%",
  },
  filterLabel: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  salaryText: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  resetButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  resetButtonText: {
    color: "#FF5C5C",
  },
});

export default FilterModalComponent;
