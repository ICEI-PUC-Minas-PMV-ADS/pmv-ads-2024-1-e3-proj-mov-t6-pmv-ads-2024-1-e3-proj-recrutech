import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { useState } from "react";
import { getVacancies } from "@/services/vacancyService";
import { VacancyInterfaces } from "@/types/Vacancy.interfaces";

export default function SearchBar({
  setVacancies,
}: {
  setVacancies: Function;
}) {
  const [value, setValue] = useState("");
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
    <View>
      <TextInput placeholder="" onChange={handleSearch} />
      <Button title="lupinha" onPress={searchValue}></Button>
    </View>
  );
}
