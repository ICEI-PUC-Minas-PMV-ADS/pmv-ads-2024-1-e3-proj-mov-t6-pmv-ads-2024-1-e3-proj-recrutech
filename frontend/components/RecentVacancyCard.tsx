import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import { RecentVacancyCardProps } from "@/types/RecentVacancyCard.interfaces";

export default function RecentVacancyCard(props: RecentVacancyCardProps) {
  return (
    <TouchableOpacity style={styles.recentVacancyCard} activeOpacity={0.9}>
      <View style={styles.cardSection}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.boldText, styles.cardTitle]}
        >
          {props.title}
        </Text>
        <Text style={styles.markedText}>{props.workingModel}</Text>
      </View>

      <View style={styles.cardSection}>
        <Text
          style={styles.enterpriseText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {props.enterprise}
        </Text>
        <Text style={[styles.boldText, styles.seniorityText]}>
          {props.seniority}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recentVacancyCard: {
    width: "100%",
    maxWidth: 300,
    padding: Spacing.smallMedium,
    gap: Spacing.smallMedium,
    fontFamily: "Roboto-Regular",
    backgroundColor: Colors.white,
    borderRadius: Spacing.smallMedium,
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
  cardSection: {
    flexDirection: "row",
    gap: Spacing.smallMedium,
    justifyContent: "space-between",
  },
  cardTitle: {
    maxWidth: 232,
    fontSize: FontSize.medium,
  },
  markedText: {
    minWidth: 50,
    textAlign: "center",
    padding: Spacing.extraSmall,
    backgroundColor: Colors.green,
    borderRadius: Spacing.smallMedium,
  },
  boldText: {
    fontFamily: "Roboto-Bold",
  },
  seniorityText: {
    padding: Spacing.extraSmall,
  },
  enterpriseText: {
    fontSize: FontSize.medium,
  },
});
