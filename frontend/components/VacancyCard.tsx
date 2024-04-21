import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

import { View, Text, StyleSheet } from "react-native";

import { FontSize, Spacing } from "@/constants/Sizes";

export default function VacancyCard() {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, styles.largeText]}>
        FrontEnd Developer
        <FontAwesome
          name="star"
          size={18}
          color="gold"
          style={{ marginLeft: 25 }}
        />
      </Text>

      <Text style={[styles.text, styles.mediumText]}>Banco Mercantil</Text>
      <Text style={[styles.text, styles.smallText]}>Estágio</Text>
      <Text style={[styles.text, styles.smallText]}>Belo Horizonte - MG</Text>
      <Text style={[styles.text, styles.smallText]}>
        R$ 1300,00 <Text style={styles.markedText}>HÍBRIDO</Text>
      </Text>
      <Text style={[styles.text, styles.smallText]}>Mensal</Text>
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
  markedText: {
    gap: 20,
    width: 710,
    padding: 6,
    marginTop: 20,
    marginLeft: 110,
    borderRadius: 15,
    marginBottom: -10,
    color: Colors.black,
    backgroundColor: Colors.green,
    textDecorationColor: Colors.black,
  },
});
