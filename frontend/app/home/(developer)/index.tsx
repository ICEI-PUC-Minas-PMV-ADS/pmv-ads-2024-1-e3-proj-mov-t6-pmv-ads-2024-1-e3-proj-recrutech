import FilterModalComponent from "@/components/FilterModalComponent";
import RecentVacancyCard from "@/components/RecentVacancyCard";
import SearchBar from "@/components/SearchBar";
import VacancyCard from "@/components/VacancyCard";
import { FontSize, Spacing } from "@/constants/Sizes";
import { User } from "@/types/User.interfaces";
import {
  Contract,
  Office,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function DeveloperHomePage() {
  const [vacancy, setVacancy] = useState<
    VacancyInterfaces.Receive.List[] | null
  >(null);
  const [users, setUsers] = useState<User.Receive.Create[] | null>(null);

  useEffect(() => {
    console.log(vacancy);
  }, [vacancy]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const clearResults = () => {
    setVacancy(null);
    setUsers(null);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        setVacancies={setVacancy}
        setUsers={setUsers}
        clearResults={clearResults}
      ></SearchBar>
      {!vacancy ? (
        <>
          <View>
            <Text style={styles.recentViwedTitle}>Vistas recentemente</Text>
            <FlatList
              data={vacancy}
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
              data={vacancy}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.vacancyItemContainer}
              renderItem={({ index, item }) => (
                <RecentVacancyCard
                  title={item.name}
                  seniority={Office[item.contract]}
                  workingModel={Contract[item.cargo]}
                  enterprise={item.enterprise}
                />
              )}
            />
          </View>
        </>
      ) : (
        <>
          <View>
            <Text style={styles.recentViwedTitle}>Vistas recentemente</Text>
            <FlatList
              data={vacancy}
              style={{ flexGrow: 0 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ index, item }) => (
                <RecentVacancyCard
                  title={item.name}
                  seniority={Office[item.contract]}
                  workingModel={Contract[item.cargo]}
                  enterprise={item.enterprise}
                />
              )}
            />
          </View>
        </>
      )}
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
