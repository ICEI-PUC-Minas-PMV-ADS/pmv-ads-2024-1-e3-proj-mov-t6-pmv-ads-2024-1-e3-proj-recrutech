import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserCardProps {
  id?: string;
  name: string;
  email: string;
  technologies?: string[];
  location?: string;
}

const redirectToUserProfile = (id?: string) => {
  if (!id) return;

  router.replace(`/home/(developer)/${id}`);
};

export default function UserCard({
  id,
  name,
  email,
  location = "Belo Horizonte",
  technologies = ["React Native"],
}: UserCardProps): JSX.Element {
  return (
    <TouchableOpacity onPress={() => redirectToUserProfile(id)}>
      <View style={styles.container}>
        <View style={styles.containerInfos}>
          <Text style={styles.usernameText}>{name}</Text>
          <Text style={styles.technology}>{technologies[0]}</Text>
        </View>
        <View style={styles.containerInfos}>
          <Text>{email}</Text>
          <Text>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: Spacing.medium,
  },
  containerInfos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: Spacing.smallMedium,
  },
  usernameText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "bold",
    padding: 0,
  },
  technology: {
    padding: Spacing.small,
    backgroundColor: Colors.green,
    borderRadius: Spacing.medium,
    fontFamily: "Roboto-Bold",
  },
});
