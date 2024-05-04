import RecentVacancyCard from "@/components/RecentVacancyCard";
import VacancyCard from "@/components/VacancyCard";
import { FontSize, Spacing } from "@/constants/Sizes";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function DeveloperHomePage() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.recentViwedTitle}>Vistas recentemente</Text>
        <FlatList
          data={Array(3)}
          horizontal={true}
          style={{ flexGrow: 0 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ index, item }) => <VacancyCard />}
        />
      </View>
      <View>
        <Text style={styles.recentViwedTitle}>Vagas recentes</Text>
        <FlatList
          data={Array(3)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.vacancyItemContainer}
          renderItem={({ index, item }) => (
            <RecentVacancyCard
              title="Title"
              seniority="Pleno"
              workingModel="CLT"
              enterprise="Google"
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.medium,
    width: "100%",
    flexDirection: "column",
  },
  listContainer: {
    paddingRight: 150,
    gap: Spacing.medium,
    alignItems: "flex-start",
  },
  recentViwedTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Regular",
    marginBottom: Spacing.medium,
  },
  vacancyItemContainer: {
    gap: Spacing.medium,
    alignItems: "center",
    paddingBottom: Spacing.medium,
  },
});
