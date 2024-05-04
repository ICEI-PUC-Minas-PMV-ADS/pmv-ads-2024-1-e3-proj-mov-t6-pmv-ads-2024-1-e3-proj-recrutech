import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

import { View, Text, StyleSheet } from "react-native";

import { FontSize, Spacing } from "@/constants/Sizes";

export default function VacancyCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.text, styles.largeText]}>FrontEnd Developer</Text>
        <FontAwesome size={18} name="star" color="gold" />
      </View>

      <View style={styles.cardBody}>
        <View>
          <Text style={[styles.text, styles.mediumText]}>Banco Mercantil</Text>
          <Text style={[styles.text, styles.smallText]}>Estágio</Text>
          <Text style={[styles.text, styles.smallText]}>
            Belo Horizonte - MG
          </Text>
          <Text style={[styles.text, styles.smallText]}>R$ 1300,00</Text>
          <Text style={[styles.text, styles.smallText]}>Mensal</Text>
        </View>

        <Text style={styles.markedText}>HÍBRIDO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 300,
    padding: Spacing.medium,
    borderRadius: Spacing.small,
    backgroundColor: Colors.darkBlue,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.white,
    marginBottom: Spacing.small,
  },
  smallText: {
    fontSize: FontSize.small,
  },
  mediumText: {
    fontSize: FontSize.medium,
  },
  largeText: {
    fontSize: FontSize.large,
    color: Colors.green,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  markedText: {
    color: Colors.black,
    padding: Spacing.extraSmall,
    borderRadius: Spacing.medium,
    backgroundColor: Colors.green,
    textDecorationColor: Colors.black,
  },
});
