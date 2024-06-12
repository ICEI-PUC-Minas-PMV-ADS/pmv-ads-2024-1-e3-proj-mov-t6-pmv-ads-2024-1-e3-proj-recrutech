import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  ToastAndroid,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { getVacancyById, updateVacancy } from "@/services/vacancyService";
import { VacancyInterfaces } from "@/types/Vacancy.interfaces";
import { usePickerState } from "../create";

interface PatchOperation {
  op: string;
  path: string;
  value: string | number;
}

const EditVacancyForm = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<VacancyInterfaces.Receive.Create | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const requirementStates = usePickerState([
    { label: "Java", value: "java" },
    { label: "Node", value: "node" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getVacancyById(id);
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (data) {
      try {
        const patchOperations: PatchOperation[] = [
          { op: "replace", path: "/name", value: data.name || "" },
          { op: "replace", path: "/enterprise", value: data.enterprise || "" },
          { op: "replace", path: "/location", value: data.location || "" },
          {
            op: "replace",
            path: "/remuneration",
            value: data.remuneration || 0,
          },
        ];
        await updateVacancy(id, patchOperations);
        router.push(`/recruiterVacancies/${id}`);
        ToastAndroid.show("Vaga atualizada com sucesso", 2000);
      } catch (err) {
        console.error("Failed to update vacancy:", err);
        setError("Failed to update data.");
      }
    }
  };

  const handleChange = (name: string, value: string | number) => {
    if (data) {
      setData({ ...data, [name]: value } as VacancyInterfaces.Receive.Create);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={data.name || ""}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enterprise"
        value={data.enterprise || ""}
        onChangeText={(value) => handleChange("enterprise", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={data.location || ""}
        onChangeText={(value) => handleChange("location", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Remuneration"
        value={data.remuneration?.toString() || ""}
        onChangeText={(value) => handleChange("remuneration", value)}
        keyboardType="numeric"
      />
      <View style={styles.dropdownPicker}>
        <Text style={styles.labelPicker}>Technologies:</Text>
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
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const EditVacancy = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[{ key: "content" }]}
      style={styles.list}
      renderItem={() => <EditVacancyForm />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  dropdownPicker: {
    marginBottom: 16,
  },
  labelPicker: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  picker: {
    height: 40,
    borderRadius: 10,
  },
  list: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default EditVacancy;
