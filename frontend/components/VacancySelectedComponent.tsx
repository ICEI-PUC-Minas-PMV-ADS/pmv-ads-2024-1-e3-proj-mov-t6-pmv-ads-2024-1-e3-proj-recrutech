import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";

import { useSession } from "@/context/AuthContext";
import { applyCvToVacancy } from "@/services/vacancyService";

import {
  Office,
  Contract,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

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

function convertToCurrency(value: number): string {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

interface VacancyCardProps {
  vacancySelected: VacancyInterfaces.Receive.Create;
}
const VacancyCard: React.FC<VacancyCardProps> = ({ vacancySelected }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const { session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      setUserId(session.userData.id);
    }

    console.log(vacancySelected);
  }, []);

  const handleBackPress = () => {
    router.push("/home/");
  };

  const applyCv = async (vacancyId: string, userId: string) => {
    await applyCvToVacancy(vacancyId, userId);
    router.push("/home/");
  };

  if (userId === null) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.headerTitle}>{vacancySelected.name}</Text>
          <View style={styles.vacancyRequirements}>
            <Text style={styles.requirementText}>
              {Office[vacancySelected.cargo]}
            </Text>
            <Text style={styles.requirementText}>
              {Contract[vacancySelected.contract]}
            </Text>
            <Text style={styles.requirementText}>
              {getRandomContractModel()}
            </Text>
          </View>
        </View>
        <View style={styles.companyInfo}>
          <View>
            <Text style={styles.companyTitle}>
              {vacancySelected.enterprise}
            </Text>
            <Text style={styles.companyLocation}>
              {vacancySelected.location}
            </Text>
          </View>
          <View>
            <Text style={styles.boldText}>Salário</Text>
            <Text style={styles.vacancyRemuneration}>
              {convertToCurrency(vacancySelected.remuneration)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <View style={styles.habilitiesContainer}>
          {vacancySelected.requirements.map((hability, i) => (
            <Text
              key={i}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.hability}
            >
              {hability}
            </Text>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre</Text>
          <View style={styles.aboutContent}>
            <View>
              <Text style={styles.boldText}>
                Quer fazer parte do nosso time?
              </Text>
              <Text style={styles.boldText}>Confira o que é preciso </Text>
            </View>
            <Text> • {vacancySelected.content}</Text>
          </View>
        </View>
        <View style={[styles.card, styles.benefitsCard]}>
          <Text style={styles.cardTitle}>Benefícios</Text>
          <View style={styles.benefitsContent}>
            {vacancySelected.benefits.map((benefit, index) => (
              <Text key={index}>• {benefit}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.button} onPress={handleBackPress}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => applyCv(vacancySelected.id, userId)}
          style={[styles.button, styles.greenButton]}
        >
          <Text style={styles.buttonText}>Candidatar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Spacing.medium,
    backgroundColor: Colors.white,
  },
  containerHeader: {
    width: "100%",
    padding: Spacing.medium,
    backgroundColor: Colors.white,
    gap: Spacing.medium,
  },
  headerTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Bold",
  },
  vacancyRequirements: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  requirementText: {
    minWidth: 75,
    color: Colors.white,
    textAlign: "center",
    padding: Spacing.extraSmall,
    backgroundColor: Colors.black,
    borderRadius: Spacing.medium,
  },
  companyInfo: {
    width: "100%",
    gap: Spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  companyLocation: {
    textTransform: "uppercase",
  },
  vacancyRemuneration: {
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  containerContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: Spacing.medium,
    backgroundColor: Colors.gray,
    gap: Spacing.medium,
  },
  habilitiesContainer: {
    flexDirection: "row",
    gap: Spacing.small,
    flexWrap: "wrap",
  },
  hability: {
    maxWidth: 100,
    color: Colors.white,
    padding: Spacing.small,
    backgroundColor: Colors.green,
    borderRadius: Spacing.medium,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.medium,
    padding: Spacing.medium,
    width: "100%",
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
  cardTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
    marginBottom: Spacing.small,
  },
  aboutContent: {
    width: "100%",
    gap: Spacing.medium,
  },
  benefitsCard: {},
  benefitsContent: {},
  boldText: {
    fontWeight: "bold",
  },
  containerFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.medium,
    backgroundColor: Colors.white,
  },
  button: {
    flex: 1,
    maxWidth: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    borderRadius: Spacing.medium,
    padding: Spacing.smallMedium,
  },
  greenButton: {
    backgroundColor: "#2DC672",
  },
  buttonText: {
    fontSize: FontSize.small,
    color: Colors.black,
  },
});

export default VacancyCard;
