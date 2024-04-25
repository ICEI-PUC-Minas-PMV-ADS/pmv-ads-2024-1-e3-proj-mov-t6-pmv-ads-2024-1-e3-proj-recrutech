import { FlatList, StyleSheet, Text, View } from "react-native";

import { FontSize, Spacing } from "@/constants/Sizes";

import VacancyCard from "@/components/VacancyCard";
import DefaultButton from "@/components/DefaultButton";

export default function RecruiterHomePage() {
  return (
    <View>
      <View style={styles.buttonWrapper}>
        <DefaultButton title="Cadastrar nova vaga"></DefaultButton>
      </View>
      <View style={styles.jobsContainer}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.jobsContainerTitle}>Suas vagas</Text>
          }
          data={Array(10)}
          renderItem={({ index }) => (
            <View style={{ padding: Spacing.small }}>
              <VacancyCard />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "60%",
  },
  jobsContainer: {
    width: "100%",
    padding: Spacing.smallMedium,
  },
  jobsContainerTitle: {
    fontSize: FontSize.mediunLarge,
    marginTop: Spacing.smallMedium,
    fontFamily: "Roboto-Regular",
  },
});
