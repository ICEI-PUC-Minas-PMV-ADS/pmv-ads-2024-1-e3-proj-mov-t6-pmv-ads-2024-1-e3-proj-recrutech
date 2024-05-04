import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Platform } from "react-native";

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

const renderListItem = (
  isLastItem: boolean,
  { name, enterprise, cargo, contract }: VacancyInterfaces.Receive.List
) => {
  const marginBottom = isLastItem ? 100 : 0;
  const officeMap: Record<Office, string> = {
    [Office.MID]: "Pleno",
    [Office.JUNIOR]: "Júnior",
    [Office.SENIOR]: "Sênior",
    [Office.TRAINEE]: "Estágio",
  };

  const workingModelMap: Record<Contract, string> = {
    [Contract.REMOTE]: "Remoto",
    [Contract.HIBRID]: "Híbrido",
    [Contract.INOFFICE]: "Presencial",
  };

  return (
    <View
      style={{
        marginBottom,
        padding: Spacing.small,
      }}
    >
      <RecentVacancyCard
        {...{
          title: name,
          enterprise,
          seniority: officeMap[cargo],
          workingModel: workingModelMap[contract],
        }}
      ></RecentVacancyCard>
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
    const { id } = session?.userData as User;

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
      {vacancies && (
        <View style={styles.jobsContainer}>
          <Text style={styles.jobsContainerTitle}>Suas vagas</Text>
          <View style={styles.divider} />

          <FlatList
            data={vacancies}
            style={{ width: "100%" }}
            renderItem={({ index, item }) =>
              renderListItem(index === vacancies.length - 1, item)
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
  jobsContainerTitle: {
    fontFamily: "Roboto-Regular",
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
    fontSize: FontSize.mediunLarge,
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
