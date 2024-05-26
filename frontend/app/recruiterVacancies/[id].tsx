import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import DefaultButton from "@/components/DefaultButton";
import RecentVacancyCard from "@/components/RecentVacancyCard";

import { getVacancyById } from "@/services/vacancyService";
import {
  Contract,
  Office,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";
import { User } from "@/types/User.interfaces";
import { getUserById } from "@/services/userService";

enum ContractModel {
  CLT = "CLT",
  PJ = "PJ",
  Cooperado = "Cooperado",
}

function getRandomContractModel(): string {
  const contractModels = Object.values(ContractModel);
  const randomIndex = Math.floor(Math.random() * contractModels.length);

  return contractModels[randomIndex];
}

function redirectToUserProfile(id: string) {
  if (!id) return;

  router.push(`/home/(developer)${id}`);
}

const generateRandomCandidates = (numCandidates: number) => {
  const candidates = Array.from({ length: numCandidates }, (_, index) => ({
    id: index.toString(),
    name: `Candidato ${index + 1}`,
    seniority: "Seniority " + (index + 1),
    workingModel: "Working Model " + (index + 1),
    enterprise: `Empresa ${index + 1}`,
  }));
  return candidates;
};

const goBack = () => {
  router.replace("/home/");
};

const PageContent = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [vacancyData, setVacancyData] =
    useState<VacancyInterfaces.Receive.Create | void>();
  const [candidates, setCandidates] = useState<User.Receive.Create[]>([]);

  useEffect(() => {
    getVacancyById(id).then((response) => {
      if (response) {
        setVacancyData(response);

        const getUserDataPromises = response.cvs.map((cv) =>
          getUserById(+cv.userId)
        );

        Promise.all(getUserDataPromises).then((users) => {
          if (users && users.length > 0) {
            setCandidates(
              users.filter((user) => !!user) as User.Receive.Create[]
            );
          }
        });
      }
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Sua vaga possui atualmente:</Text>
        <Ionicons
          name="arrow-back-circle-outline"
          size={24}
          style={styles.Backicon}
          onPress={goBack}
        />
        <Text style={styles.defaultText}>{candidates.length} Candidaturas</Text>
        <View style={styles.headerStyle}>
          <Text style={styles.seniorityText}> {vacancyData?.name} </Text>
          <TouchableOpacity>
            <Ionicons
              name="create-outline"
              size={24}
              style={styles.icon}
              activeOpacity={0.9}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.vanciesProperties}>
          <Text style={styles.vanciesPropertiesText}>
            {Office[vacancyData?.cargo || 1]}
          </Text>
          <Text style={styles.vanciesPropertiesText}>
            {Contract[vacancyData?.contract || 1]}
          </Text>
          <Text style={styles.vanciesPropertiesText}>
            {getRandomContractModel()}
          </Text>
        </View>

        <View style={styles.detailsVacancies}>
          <Text style={styles.companyName}> {vacancyData?.enterprise} </Text>
          <Text style={styles.salaryValue}>Salário</Text>
        </View>

        <View style={styles.detailsVacancies}>
          <Text style={styles.CityText}>{vacancyData?.location}</Text>
          <Text style={styles.salaryValue}>R$ {vacancyData?.remuneration}</Text>
        </View>
      </View>

      <Text style={styles.applications}> Candidaturas:</Text>
      {candidates.length !== 0 ? (
        <FlatList
          data={candidates}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={styles.vacancyItemContainer}
          style={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => redirectToUserProfile(id)}
              activeOpacity={0.9}
            >
              <RecentVacancyCard
                id={item.id}
                key={item.id}
                onPress={() => {}}
                title={item.userName}
                seniority={""}
                workingModel={item.address?.localidade || "Belo Horizonte"}
                enterprise={item.email}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.defaultText}>Nenhuma candidatura realizada</Text>
      )}

      <View style={styles.bodyContainer}>
        <DefaultButton
          title="Finalizar Vaga"
          variant="secondary"
          link={{
            pathname: "/sign-in/dev",
          }}
          moreStyles={styles.button}
        />
      </View>
    </View>
  );
};

export default function Page(): JSX.Element {
  return <FlatList data={[{}]} renderItem={() => <PageContent />} />;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.extraLarge,
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginTop: 30,
  },
  headerContainer: {
    alignItems: "center",
    gap: Spacing.medium,
  },
  bodyContainer: {
    gap: Spacing.smallMedium,
    maxWidth: 200,
  },
  scrollContainer: {
    flex: 2,
  },
  itemSeparator: {
    height: Spacing.medium,
    width: "100%",
  },
  Backicon: {
    fontSize: FontSize.extraLarge,
    color: Colors.green,
    marginRight: 300,
    borderRadius: 15,
  },

  titleText: {
    color: Colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    marginTop: 20,
    marginBottom: -45,
  },
  CityText: {
    fontFamily: "Roboto-Regular",
  },
  defaultText: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  seniorityText: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.large,
    maxWidth: 300,
  },
  applications: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.extraLarge,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: FontSize.extraLarge,
    color: Colors.green,
    marginRight: 1,
  },
  vanciesProperties: {
    flexDirection: "row",
    maxWidth: 320,
    gap: Spacing.medium,
    width: "100%",
  },
  vanciesPropertiesText: {
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    backgroundColor: Colors.darkBlue,
    color: "white",
    padding: 3,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 13,
  },

  detailsVacancies: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
  companyName: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  salaryValue: {
    color: Colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    marginRight: 25,
  },
  recentViwedTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Regular",
    marginBottom: Spacing.medium,
  },
  vacancyItemContainer: {
    justifyContent: "center",
    gap: Spacing.medium,
  },
  flatList: {},
  button: {
    marginBottom: 10,
  },
});
