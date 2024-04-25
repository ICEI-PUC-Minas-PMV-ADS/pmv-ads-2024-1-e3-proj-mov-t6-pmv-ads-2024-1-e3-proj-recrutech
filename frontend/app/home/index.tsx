import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Sizes";
import { useSession } from "@/context/AuthContext";

import DeveloperHomePage from "./(developer)";
import RecruiterHomePage from "./(recruiter)";

export default function Home() {
  const { session } = useSession();
  const { isRecruiter } = session!.userData;

  return (
    <View style={styles.container}>
      {isRecruiter ? <RecruiterHomePage /> : <DeveloperHomePage />}
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
});
