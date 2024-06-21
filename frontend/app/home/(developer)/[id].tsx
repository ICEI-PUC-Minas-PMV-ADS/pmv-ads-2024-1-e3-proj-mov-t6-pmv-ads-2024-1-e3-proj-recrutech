import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { router, useLocalSearchParams } from "expo-router";

import { useSession } from "@/context/AuthContext";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import { User } from "@/types/User.interfaces";
import { getUserById } from "@/services/userService";
import ReccomendationModalComponent from "@/components/ReccomendationModal";
import {
  FormattedRecommendation,
  deleteRecommendation,
} from "@/services/reccomendationService";
import { isAxiosError } from "axios";

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

const deleteRec = (recommendationId: number) => {
  deleteRecommendation(recommendationId)
    .then(() => {
      ToastAndroid.show("Recomendação deletada", 4000);
    })
    .catch((error) => {
      if (isAxiosError(error)) {
        console.log(error.message);
      }

      ToastAndroid.show("Erro ao deletar recomendação", 4000);
    });
};

const RecommendationComponent = ({
  reccomendation,
  loggedUserId,
}: {
  reccomendation: FormattedRecommendation;
  loggedUserId: number;
}): JSX.Element => {
  const isLoggedUserOwner =
    reccomendation.recommendation.providerId === loggedUserId;

  return (
    <View style={styles.recommendationBox}>
      {isLoggedUserOwner ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 5,
            top: 12,
          }}
          activeOpacity={0.9}
          onPress={() => deleteRec(reccomendation.recommendation.id)}
        >
          <AntDesign name="delete" size={22} color="black" />
        </TouchableOpacity>
      ) : null}
      <Text>{reccomendation.recommendation.description}</Text>
      <View>
        <Text style={{ textAlign: "right" }}>
          Por: {reccomendation.providerName}
        </Text>
      </View>
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
  recommendations: FormattedRecommendation[] | undefined
): FormattedRecommendation[] => {
  const defaultReccomendation: FormattedRecommendation = {
    id: 0,
    userId: 0,
    providerName: "",
    recommendationId: 0,
    recommendation: {
      id: 0,
      providerId: 0,
      description: "O usuário não possui recomendações",
    },
  };

  if (!recommendations || !recommendations.length) {
    return [defaultReccomendation];
  }

  return recommendations;
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

const openBrowser = (link: string | undefined) => {
  if (!link) {
    return;
  }

  Linking.canOpenURL(link).then((supported) => {
    if (supported) {
      Linking.openURL(link);
    } else {
      ToastAndroid.show("Don't know how to open URI: " + link, 2000);
    }
  });
};

const ProfileComponent = (): JSX.Element => {
  const [userData, setUserdata] = useState<User.Receive.Create | void>();
  const { session } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [openModal, setOpenModal] = useState(false);
  const [recommendations, setRecommendations] = useState<
    FormattedRecommendation[]
  >([]);

  if (!id) {
    router.replace("/home/");
  }

  const getRecommendationsByUser = async (
    userData: User.Receive.Create
  ): Promise<FormattedRecommendation[] | undefined> => {
    const owners = await Promise.all(
      userData.userRecommendations!.map((reccomendation) =>
        getUserById(reccomendation.recommendation.providerId)
      )
    );

    if (!owners || !owners.length) return;

    const formattedReccomendations = userData.userRecommendations!.map(
      (reccomendation, index) => ({
        ...reccomendation,
        providerName: owners[index]!.userName,
      })
    );

    return formattedReccomendations;
  };

  const formatReccomendations = async (
    userData: User.Receive.Create | void
  ) => {
    if (
      !userData ||
      !userData.userRecommendations ||
      !userData.userRecommendations.length
    ) {
      return;
    }

    const recommendations = await getRecommendationsByUser(userData);
    if (!recommendations) return;

    setRecommendations(recommendations);
  };

  useEffect(() => {
    getUserById(+id).then((response) => {
      setUserdata(response);
      formatReccomendations(response);
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
      <View style={[styles.container]}>
        <View style={styles.reccomendations}>
          <Text style={styles.sectionTitle}>Recomendações:</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ width: 30, height: 30 }}
            onPress={() => setOpenModal(true)}
          >
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={getUserRecomendationsOrDefault(recommendations)}
          style={{
            gap: 12,
          }}
          renderItem={({ item, index }) => (
            <RecommendationComponent
              key={index}
              reccomendation={item}
              loggedUserId={session?.userData.id}
            />
          )}
        />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            openBrowser(userData?.curriculum.github);
          }}
        >
          <Image
            source={require("@/assets/images/github.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            openBrowser(userData?.curriculum.linkedin);
          }}
        >
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
      <ReccomendationModalComponent
        userId={+id}
        openModal={openModal}
        setOpenModal={setOpenModal}
        receiverName={userData?.userName || "Sandro"}
      />
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
  reccomendations: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendationBox: {
    width: "100%",
    padding: Spacing.medium,
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: Colors.green,
    borderRadius: Spacing.smallMedium,
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
