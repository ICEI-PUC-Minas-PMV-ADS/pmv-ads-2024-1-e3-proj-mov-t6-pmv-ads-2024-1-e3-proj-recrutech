import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

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

const getUserTechnologiesOrDefault = (userData: User.Receive.Create | void) => {
  return (
    (userData && userData.curriculum && userData.curriculum.tecnologies) || [
      "O usuário não possui tecnologias cadastradas",
    ]
  );
};

const getUserRecomendationsOrDefault = (
  userData: User.Receive.Create | void
) => {
  return (userData && userData.userRecommendations) || ["Sem recomendações"];
};

const getUserCoursesOrDefault = (userData: User.Receive.Create | void) => {
  return (
    (userData && userData.curriculum && userData.curriculum.course) || [
      {
        myCourse: "O usuário não possui cursos cadastrados",
        institution: "",
        id: 0,
      },
    ]
  );
};

const getUserExperiencesOrDefault = (userData: User.Receive.Create | void) => {
  return (
    (userData && userData.curriculum && userData.curriculum.experience) || [
      {
        function: "O usuário não possui experiências cadastradas",
        enterprise: "",
        id: 0,
      },
    ]
  );
};

const redirectToHome = () => {
  router.replace("/home/");
};

const ProfileComponent = (): JSX.Element => {
  const [userData, setUserdata] = useState<User.Receive.Create | void>();
  const { session } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    router.replace("/home/");
  }

  useEffect(() => {
    getUserById(+id).then((response) => {
      setUserdata(response);
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
          {userData?.curriculum?.about || "O usuário não possui descrição"}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Cursos:</Text>
        <FlatList
          data={getUserCoursesOrDefault(userData)}
          renderItem={({ item }) => <CourseComponent course={item.myCourse} />}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Experiências:</Text>
        <FlatList
          data={getUserExperiencesOrDefault(userData)}
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
          data={getUserTechnologiesOrDefault(userData)}
          renderItem={({ item, index }) => (
            <TecnologyComponent key={index} technology={item} />
          )}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recomendações:</Text>
        <FlatList
          data={getUserRecomendationsOrDefault(userData)}
          renderItem={({ item, index }) => (
            <RecommendationComponent key={index} reccomendation={item} />
          )}
        />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity activeOpacity={0.9}>
          <Image
            source={require("@/assets/images/github.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9}>
          <Image
            source={require("@/assets/images/linkedin.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={redirectToHome}
        activeOpacity={0.9}
      >
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
