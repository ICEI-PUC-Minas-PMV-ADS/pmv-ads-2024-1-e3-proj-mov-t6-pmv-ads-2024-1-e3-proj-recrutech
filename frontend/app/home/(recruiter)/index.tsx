import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

import { FontSize, Spacing } from "@/constants/Sizes";

import DefaultButton from "@/components/DefaultButton";
import RecentVacancyCard from "@/components/RecentVacancyCard";

import { Vacancy, getVacancies } from "@/utils/vacancies";
import { useSession } from "@/context/AuthContext";
import { User } from "@/types/User.interfaces";

const renderListItem = (isLastItem: boolean, { name, enterprise }: Vacancy) => {
  const marginBottom = isLastItem ? Spacing.huge : 0;

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
          seniority: "Pleno",
          workingModel: "CLT",
        }}
      ></RecentVacancyCard>
    </View>
  );
};

export default function RecruiterHomePage() {
  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null);
  const { session } = useSession();

  useEffect(() => {
    const { id } = session?.userData as User;

    getVacancies(id).then((response) => {
      if (response) {
        setVacancies(response);
      }
    });
  }, []);

  return (
    <View>
      <View style={styles.buttonWrapper}>
        <DefaultButton title="Cadastrar nova vaga"></DefaultButton>
      </View>
      {vacancies && (
        <View style={styles.jobsContainer}>
          <Text style={styles.jobsContainerTitle}>Suas vagas</Text>

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
    fontSize: FontSize.mediunLarge,
    marginBottom: Spacing.smallMedium,
  },
});
