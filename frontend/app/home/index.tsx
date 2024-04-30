import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";
import { useSession } from "@/context/AuthContext";

import DeveloperHomePage from "./(developer)";
import RecruiterHomePage from "./(recruiter)";

export default function Home() {
  const { session } = useSession();
  const { userName, isRecruiter } = session?.userData || {};

  return (
    <View>
      <Text style={styles.greetingText}>
        <Text style={styles.textGreen}>Bem vindo, </Text>
        {userName || "Usuário"}
      </Text>
      <View style={styles.container}>
        {isRecruiter ? <RecruiterHomePage /> : <DeveloperHomePage />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Spacing.large,
  },
  greetingText: {
    fontSize: Spacing.medium,
    fontFamily: "Roboto-Bold",
    marginTop: Spacing.large,
    paddingLeft: Spacing.small,
    textAlign: "left",
  },
  textGreen: {
    color: Colors.green,
  },
});
