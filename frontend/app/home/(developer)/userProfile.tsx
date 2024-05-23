import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { useSession } from "@/context/AuthContext";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import { User } from "@/types/User.interfaces";
import { getUserById } from "@/services/userService";

const CourseComponent = ({ course }: { course: string }): JSX.Element => {
  return (
    <View>
      <Text>{course}</Text>
    </View>
  );
};

export const ExperienceComponent = ({
  expecience,
}: {
  expecience: string;
}): JSX.Element => {
  return (
    <View>
      <Text> {expecience}</Text>
    </View>
  );
};

const TecnologyComponent = ({
  technology,
}: {
  technology: string;
}): JSX.Element => {
  return (
    <View style={styles.technologyItem}>
      <Text>{technology}</Text>
    </View>
  );
};

const RecommendationComponent = ({
  reccomendation,
}: {
  reccomendation: string;
}): JSX.Element => {
  return (
    <View>
      <Text>{reccomendation}</Text>
    </View>
  );
};

const redirectToHome = () => {
  router.replace("/home/");
};

const ProfileComponent = (): JSX.Element => {
  const [userData, setUserdata] = useState<User.Receive.Create | void>();
  const { session } = useSession();

  useEffect(() => {
    getUserById(session?.userData.id).then((response) => {
      setUserdata(response);
      console.log(response && response.address);
    });
  }, []);

  if (!session) {
    router.replace("/sign-in/dev");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}></View>
      <View style={styles.container}>
        <View style={styles.aboutHeader}>
          <Image
            style={styles.profileImage}
            source={require("@/assets/images/profile_2.png")}
          />
          <View style={styles.aboutHeaderText}>
            <Text style={styles.aboutUsernameText}>{userData?.userName}</Text>
            <Text style={styles.aboutLocationText}>
              {userData?.address?.bairro} - {userData?.address?.localidade}
            </Text>
          </View>
        </View>
        <Text style={styles.aboutContentText}>
          {userData?.curriculum.about}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Cursos:</Text>
        <FlatList
          data={
            (userData?.curriculum?.course.length &&
              userData?.curriculum?.course) || [
              {
                myCourse: "O usuário não possui cursos cadastrados",
                institution: "",
                id: 0,
              },
            ]
          }
          renderItem={({ item }) => <CourseComponent course={item.myCourse} />}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Experiências:</Text>
        <FlatList
          data={
            (userData?.curriculum?.experience.length &&
              userData?.curriculum?.experience) || [
              {
                function: "O usuário não possui experiências cadastradas",
                enterprise: "",
                id: 0,
              },
            ]
          }
          renderItem={({ item }) => (
            <ExperienceComponent expecience={item.function} />
          )}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Tecnologias:</Text>
        <FlatList
          style={{
            flexDirection: "row",
            gap: Spacing.small,
            flexWrap: "wrap",
          }}
          data={
            (userData?.curriculum?.tecnologies.length &&
              userData?.curriculum?.tecnologies) || [
              "O usuário não possui tecnologias cadastradas",
            ]
          }
          renderItem={({ item }) => <TecnologyComponent technology={item} />}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recomendações:</Text>
        <FlatList
          data={
            (userData?.userRecommendations?.length &&
              userData?.userRecommendations) || ["Sem recomendações"]
          }
          renderItem={({ item }) => (
            <RecommendationComponent reccomendation={item} />
          )}
        />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/github.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/linkedin.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={redirectToHome}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Page() {
  return (
    <FlatList
      contentContainerStyle={{ padding: Spacing.medium }}
      data={Array(1)}
      renderItem={() => <ProfileComponent />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: Spacing.medium,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.smallMedium,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  container: {
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    padding: Spacing.medium,
    borderColor: Colors.green,
    borderRadius: Spacing.smallMedium,
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: Spacing.extraLarge,
  },
  aboutHeader: {
    alignItems: "center",
  },
  aboutUsernameText: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Bold",
  },
  aboutLocationText: {
    fontSize: FontSize.small,
    fontFamily: "Roboto-Regular",
  },
  aboutHeaderText: {
    alignItems: "center",
    fontSize: FontSize.medium,
    marginTop: Spacing.medium,
    fontFamily: "Roboto-Regular",
  },
  aboutContentText: {
    fontSize: FontSize.small,
    marginTop: Spacing.small,
    fontFamily: "Roboto-Regular",
  },
  sectionTitle: {
    alignSelf: "flex-start",
    marginBottom: Spacing.small,
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Bold",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: Spacing.medium,
    marginTop: Spacing.medium,
  },
  icon: {
    width: 30,
    height: 30,
  },
  backButton: {
    width: "100%",
    alignItems: "center",
    padding: Spacing.smallMedium,
    backgroundColor: Colors.green,
  },
  backButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
  },
  technologyItem: {
    minWidth: 75,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.small,
    backgroundColor: Colors.green,
    borderRadius: Spacing.medium,
  },
});
