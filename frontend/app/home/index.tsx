import VacancyCard from "@/components/VacancyCard";
import DefaultButton from "@/components/DefaultButton";

import { FontSize, Spacing } from "@/constants/Sizes";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSession } from "@/context/AuthContext";

export default function Home() {
  const { session } = useSession();
  const isRecruiter = session?.userData.isRecruiter;

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Spacing.large,
  },
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
