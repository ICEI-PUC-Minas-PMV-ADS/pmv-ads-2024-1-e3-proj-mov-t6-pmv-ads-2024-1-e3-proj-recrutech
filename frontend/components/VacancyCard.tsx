import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { FontAwesome } from "@expo/vector-icons";

import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function VacancyCard() {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, styles.largeText]}>
        FrontEnd Developer{" "}
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
    backgroundColor: Colors.darkBlue,
    padding: Spacing.medium,
    borderRadius: Spacing.small,
    width: "85%",
    height: "30%",
    marginBottom: -15,
    marginTop: -20,
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
    marginTop: 20,
    gap: 20,
    backgroundColor: Colors.green,
    borderRadius: 15,
    padding: 6,
    width: 710,
    marginBottom: -10,
    marginLeft: 110,
    textDecorationColor: Colors.black,
    color: Colors.black,
  },
});
