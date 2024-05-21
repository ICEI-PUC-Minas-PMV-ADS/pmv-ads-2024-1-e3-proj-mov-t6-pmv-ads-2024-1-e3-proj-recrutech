import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Dimensions,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { getVacancies } from "@/services/vacancyService";
import FilterModalComponent from "./FilterModalComponent";
import { getUsers } from "@/services/userService";
import { Picker } from "@react-native-picker/picker";

export default function SearchBar({
  setVacancies,
  setUsers,
  clearResults,
}: {
  setVacancies: Function;
  setUsers: Function;
  clearResults: Function;
}) {
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState("vacancies");

  const handleSearch = (
    inputValue: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setValue(inputValue.nativeEvent.text);
  };

  const searchValue = () => {
    if (searchType === "vacancies") {
      getVacancies(value).then((response) => {
        const filteredVacancies =
          response &&
          response.filter((vacancy) =>
            vacancy.name.toLowerCase().includes(value.toLowerCase())
          );

        if (Array.isArray(filteredVacancies) && filteredVacancies.length > 0) {
          setVacancies(filteredVacancies);
        } else setVacancies(null);
      });
    } else if (searchType === "users") {
      getUsers(value).then((response) => {
        const filteredUsers =
          response &&
          response.filter((user) =>
            user.userName.toLowerCase().includes(value.toLowerCase())
          );

        if (Array.isArray(filteredUsers) && filteredUsers.length > 0) {
          setUsers(filteredUsers);
        } else setUsers(null);
      });
    }
  };

  const handleSwitchChange = (itemValue: string) => {
    setSearchType(itemValue);
    clearResults(); // Chama a função de limpeza ao alterar o switcher
    setValue(""); // Limpa o valor do campo de busca
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.switcherContainer}>
          <Picker
            selectedValue={searchType}
            style={styles.picker}
            onValueChange={handleSwitchChange} // Usa a nova função de limpeza
          >
            <Picker.Item label="Vagas" value="vacancies" />
            <Picker.Item label="Usuários" value="users" />
          </Picker>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            onChange={handleSearch}
            value={value}
          />
          <TouchableOpacity onPress={searchValue} style={styles.searchIcon}>
            <Icon name="search" size={20} color="#2DC672" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.filterIcon}
        >
          <Icon name="sliders" size={20} color="#2DC672" />
        </TouchableOpacity>
        <FilterModalComponent
          setVacancies={setVacancies}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  switcherContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2DC672",
    borderRadius: 5,
    flex: 1,
    width: "100%",
    maxWidth: 300,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  filterIcon: {
    padding: 10,
  },
});
