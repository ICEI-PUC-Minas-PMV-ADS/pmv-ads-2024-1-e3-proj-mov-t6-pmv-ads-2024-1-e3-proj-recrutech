import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface RecentVacancyCardProps{
    title: string,
    workingModel: string,
    enterprise: string,
    seniority:string
}
export default function RecentVacancyCard(props:RecentVacancyCardProps) {
  return (
    <View style={styles.RecentVacancyCard}>
      <Text style={styles.office}>
       {props.title} <Text style={styles.markedText}>{props.workingModel}</Text>
      </Text>
      <Text>
        {props.enterprise} <Text style={styles.senioridade}>{props.seniority}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    RecentVacancyCard: {
    paddingTop: 20,
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
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
  office: {
    padding: 5,
  },

  senioridade: {
    marginLeft: 200,
    padding: 1,
    marginEnd: 10,
    gap: 10,
  },
});
