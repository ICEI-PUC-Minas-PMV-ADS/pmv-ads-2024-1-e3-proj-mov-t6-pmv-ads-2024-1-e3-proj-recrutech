import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import DefaultButton from "@/components/DefaultButton";
import RecentVacancyCard from "@/components/RecentVacancyCard";

import {
  Office,
  Contract,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";
import { User } from "@/types/User.interfaces";

import { useSession } from "@/context/AuthContext";
import { getVacanciesByUserId } from "@/services/vacancyService";

const redirectToRecruiterVacancies = (id?: string) => {
  if (!id) return;

  router.push(`/recruiterVacancies/${id}`);
};

const renderListItem = (
  isLastItem: boolean,
  { name, enterprise, cargo, contract, id }: VacancyInterfaces.Receive.List
) => {
  const marginBottom = isLastItem ? 100 : 0;
  const officeMap: Record<Office, string> = {
    [Office.Pleno]: "Pleno",
    [Office.Júnior]: "Júnior",
    [Office.Sênior]: "Sênior",
    [Office.Estágio]: "Estágio",
  };

  const workingModelMap: Record<Contract, string> = {
    [Contract.Remoto]: "Remoto",
    [Contract.Híbrido]: "Híbrido",
    [Contract.Presencial]: "Presencial",
  };

  return (
    <View
      style={{
        marginBottom,
        padding: Spacing.small,
      }}
    >
      <TouchableOpacity
        onPress={() => redirectToRecruiterVacancies(id)}
        activeOpacity={0.9}
      >
        <RecentVacancyCard
          {...{
            id,
            enterprise,
            title: name,
            onPress: () => {
              router.push(`/recruiterVacancies/${id}`);
            },
            seniority: officeMap[cargo],
            workingModel: workingModelMap[contract],
          }}
        ></RecentVacancyCard>
      </TouchableOpacity>
    </View>
  );
};

const redirectToCreateVacancy = () => {
  router.replace("/home/(recruiter)/(vacancy)/create");
};

export default function RecruiterHomePage() {
  const [vacancies, setVacancies] = useState<
    VacancyInterfaces.Receive.List[] | null
  >(null);
  const { session } = useSession();

  useEffect(() => {
    const { id } = session?.userData as User.Receive.Create;

    getVacanciesByUserId(id).then((response) => {
      if (response && Array.isArray(response)) {
        setVacancies(response);
      }
    });
  }, []);

  return (
    <View>
      <View style={styles.buttonWrapper}>
        <DefaultButton
          title="Cadastrar nova vaga"
          onPress={redirectToCreateVacancy}
        ></DefaultButton>
      </View>

      <View style={styles.listWrapper}>
        {vacancies && (
          <FlatList
            data={vacancies}
            contentContainerStyle={styles.userItemContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ index, item }) =>
              renderListItem(index === vacancies.length - 1, item)
            }
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "60%",
    alignSelf: "center",
  },
  jobsContainer: {
    width: "100%",
    flexDirection: "column",
    padding: Spacing.smallMedium,
  },
  itemSeparator: {
    height: Spacing.medium,
  },
  listWrapper: {
    flex: 1,
    marginTop: Spacing.medium,
  },
  jobsContainerTitle: {
    fontFamily: "Roboto-Regular",
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
    fontSize: FontSize.mediunLarge,
  },
  userItemContainer: {
    paddingBottom: Spacing.medium,
  },
  divider: {
    borderBottomColor: Colors.black,
    marginBottom: Spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
