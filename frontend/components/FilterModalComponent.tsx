import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import { getVacancies } from "@/services/filterService";

const FilterModalComponent = ({
  setVacancies,
  modalVisible,
  setModalVisible,
}: {
  setVacancies: Function;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filtros</Text>
          <Pressable onPress={resetarFiltros}>
            <Text style={[styles.textStyle, styles.textRedefinir]}>
              Redefinir
            </Text>
          </Pressable>
          <View>
            <Text style={styles.tipo}>Tipo:</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxPair}>
                <Checkbox value={isEstagio} onValueChange={setEstagio} />
                <Text> Estágio</Text>
              </View>
              <View style={styles.checkboxPair}>
                <Checkbox value={isJunior} onValueChange={setJunior} />
                <Text> Júnior</Text>
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxPair}>
                <Checkbox value={isPleno} onValueChange={setPleno} />
                <Text> Pleno</Text>
              </View>
              <View style={styles.checkboxPair}>
                <Checkbox value={isSenior} onValueChange={setSenior} />
                <Text> Sênior</Text>
              </View>
            </View>
            <Text style={styles.tipo}>Localização</Text>
            <TextInput
              placeholder="Digite o nome da cidade"
              value={location}
              style={styles.location}
              onChange={(event) => {
                setLocation(event.nativeEvent.text);
              }}
            ></TextInput>
            <Text style={styles.tipo}>Expectativa Salarial:</Text>
            <Slider
              value={salario}
              onValueChange={(value) => {
                setSalario(Number(value.toFixed(0)));
              }}
              style={{ width: 200, height: 40, alignSelf: "center" }}
              minimumValue={1}
              maximumValue={20000}
              minimumTrackTintColor="#2DC672"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.salary}>R${salario},00</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.textStyle, styles.textClose]}>Fechar</Text>
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
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    borderColor: "#2DC672",
    borderWidth: 1,
  },
  buttonSave: {
    backgroundColor: "#2DC672",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textClose: {
    color: "#2DC672",
  },
  textRedefinir: {
    color: "#f00",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    marginBottom: 10,
  },
  location: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    minWidth: 200,
    width: "100%",
    marginBottom: 10,
    alignSelf: "center",
  },
  tipo: {
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 10,
    alignSelf: "center",
  },
  checkboxPair: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  salary: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default FilterModalComponent;
