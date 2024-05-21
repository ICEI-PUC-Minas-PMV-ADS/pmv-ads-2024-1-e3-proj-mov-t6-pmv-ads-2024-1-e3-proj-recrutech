import FilterModalComponent from "@/components/FilterModalComponent";
import RecentVacancyCard from "@/components/RecentVacancyCard";
import SearchBar from "@/components/SearchBar";
import VacancyCard from "@/components/VacancyCard";
import { FontSize, Spacing } from "@/constants/Sizes";
import {
  Contract,
  Office,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";
import { User } from "@/types/User.interfaces";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getVacancies } from "@/services/vacancyService";

export default function DeveloperHomePage() {
  const [vacancy, setVacancy] = useState<
    VacancyInterfaces.Receive.List[] | null
  >(null);
  const [users, setUsers] = useState<User.Receive.Create[] | null>(null);
  const [searchType, setSearchType] = useState("vacancies");

  useEffect(() => {
    if (searchType === "vacancies") {
      getVacancies().then((response) => {
        setVacancy(response || null);
      });
    }
  }, [searchType]);

  useEffect(() => {
    console.log(vacancy);
  }, [vacancy]);

  useEffect(() => {
    console.log(users); // Para depuração
  }, [users]);

  return (
    <View style={styles.container}>
      <SearchBar
        setVacancies={setVacancy}
        setUsers={setUsers}
        setSearchType={setSearchType}
      />
      {searchType === "vacancies" ? (
        <>
          {/* <View>
            <Text style={styles.recentViewedTitle}>Vistas recentemente</Text>
            <FlatList
              data={vacancy}
              horizontal={true}
              style={{ flexGrow: 0 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ index, item }) => <VacancyCard />}
            />
          </View> */}
          <View>
            <Text style={styles.recentViewedTitle}>Vagas recentes</Text>
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
            <Text style={styles.recentViewedTitle}>Usuários</Text>
            <FlatList
              data={users}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.userItemContainer}
              renderItem={({ index, item }) => <Text>{item.userName}</Text>}
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
  recentViewedTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Regular",
    marginBottom: Spacing.medium,
  },
  vacancyItemContainer: {
    gap: Spacing.medium,
    alignItems: "center",
    paddingBottom: Spacing.medium,
  },
  userItemContainer: {
    gap: Spacing.medium,
    alignItems: "center",
    paddingBottom: Spacing.medium,
  },
});
