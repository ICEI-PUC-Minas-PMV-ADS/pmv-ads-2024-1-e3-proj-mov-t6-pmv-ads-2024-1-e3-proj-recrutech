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
            <Text>Redefinir</Text>
          </Pressable>
          <View>
            <Text>Tipo:</Text>
            <View>
              <Checkbox value={isEstagio} onValueChange={setEstagio} />
              <Text>Estágio</Text>
            </View>
            <View>
              <Checkbox value={isJunior} onValueChange={setJunior} />
              <Text>Júnior</Text>
            </View>
            <View>
              <Checkbox value={isPleno} onValueChange={setPleno} />
              <Text>Pleno</Text>
            </View>
            <View>
              <Checkbox value={isSenior} onValueChange={setSenior} />
              <Text>Sênior</Text>
            </View>
            <TextInput
              placeholder="Localização"
              value={location}
              style={styles.input}
              onChange={(event) => {
                setLocation(event.nativeEvent.text);
              }}
            ></TextInput>
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
            <Text>R${salario},00</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={filtrarVagas}
            >
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>
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
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    marginBottom: 10,
  },
});

export default FilterModalComponent;
