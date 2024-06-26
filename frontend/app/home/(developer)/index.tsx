import SearchBar from "@/components/SearchBar";
import { FontSize, Spacing } from "@/constants/Sizes";
import RecentVacancyCard from "@/components/RecentVacancyCard";

import {
  Office,
  Contract,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";

import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { User } from "@/types/User.interfaces";
import { router } from "expo-router";
import { getUserById } from "@/services/userService";
import { useSession } from "@/context/AuthContext";
import { getVacancies } from "@/services/vacancyService";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function DeveloperHomePage() {
  const [vacancy, setVacancy] = useState<
    VacancyInterfaces.Receive.List[] | null
  >(null);
  const [searchType, setSearchType] = useState("vacancies");
  const [users, setUsers] = useState<User.Receive.Create[] | null>(null);
  const { session } = useSession();

  useEffect(() => {
    if (searchType === "vacancies") {
      getVacancies().then((response) => {
        setVacancy(response || null);
      });
    }
  }, [searchType]);

  const clearResults = () => {
    setVacancy(null);
    setUsers(null);
  };

  function handlePress(item: string): void {
    if (!session || !session.userData) return;

    getUserById(session.userData.id).then((response) => {
      if (!response) return;

      const { curriculum } = response;

      if (!curriculum || !curriculum.id) {
        router.replace(`/home/createCv`);
        return;
      } else {
        router.replace(`/selectedVacancy/${item}`);
      }
    });
  }

  return (
    <View style={styles.container}>
      <SearchBar
        setVacancies={setVacancy}
        setUsers={setUsers}
        setSearchType={setSearchType}
      />
      {searchType === "vacancies" ? (
        <View style={styles.listWrapper}>
          {vacancy && vacancy.length > 0 ? (
            <FlatList
              data={vacancy}
              contentContainerStyle={styles.vacancyItemContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RecentVacancyCard
                  id={item.id}
                  title={item.name}
                  seniority={Office[item.contract]}
                  workingModel={Contract[item.cargo]}
                  enterprise={item.enterprise}
                  onPress={() => handlePress(item.id)}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />
          ) : (
            <Text style={styles.noResultsText}>
              Não foram encontradas vagas.
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.listWrapper}>
          {users && users.length > 0 ? (
            <FlatList
              data={users}
              contentContainerStyle={styles.userItemContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <UserCard
                  id={item.id}
                  email={item.email}
                  name={item.userName}
                  location={item.address?.localidade}
                  technologies={item.curriculum?.tecnologies}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />
          ) : (
            <Text style={styles.noResultsText}>
              Não foram encontrados usuários.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  listWrapper: {
    flex: 1,
    marginTop: Spacing.medium,
  },
  recentViewedTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Regular",
    marginBottom: Spacing.medium,
    textAlign: "center",
  },
  vacancyItemContainer: {
    paddingBottom: Spacing.medium,
  },
  userItemContainer: {
    paddingBottom: Spacing.medium,
  },
  noResultsText: {
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "gray",
  },
  itemSeparator: {
    height: Spacing.medium,
  },
});
