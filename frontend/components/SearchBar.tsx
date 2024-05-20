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

export default function SearchBar({
  setVacancies,
}: {
  setVacancies: Function;
}) {
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (
    inputValue: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setValue(inputValue.nativeEvent.text);
  };

  const searchValue = () => {
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
      </View>
      <View>
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
