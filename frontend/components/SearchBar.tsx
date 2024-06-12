import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getVacancies } from "@/services/vacancyService";
import FilterModalComponent from "./FilterModalComponent";
import { getUsers } from "@/services/userService";
import { Picker } from "@react-native-picker/picker";

export default function SearchBar({
  setVacancies,
  setUsers,
  setSearchType,
}: {
  setVacancies: Function;
  setUsers: Function;
  setSearchType: Function;
}) {
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setLocalSearchType] = useState("vacancies");

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

  const handleSearchTypeChange = (itemValue: string) => {
    setLocalSearchType(itemValue);
    setSearchType(itemValue);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            onChange={handleSearch}
            value={value}
          />
          <TouchableOpacity
            onPress={searchValue}
            style={styles.searchIcon}
            activeOpacity={0.9}
          >
            <Icon name="search" size={20} color="#2DC672" />
          </TouchableOpacity>
        </View>
        {searchType === "vacancies" && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.filterIcon}
            activeOpacity={0.9}
          >
            <Icon name="sliders" size={20} color="#2DC672" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={searchType}
          style={styles.picker}
          onValueChange={handleSearchTypeChange}
        >
          <Picker.Item label="Vagas" value="vacancies" />
          <Picker.Item label="Usuários" value="users" />
        </Picker>
      </View>
      <FilterModalComponent
        setVacancies={setVacancies}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
  pickerContainer: {
    marginTop: 10,
    alignSelf: "center",
  },
  picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: "#2DC672",
    borderRadius: 5,
  },
});
