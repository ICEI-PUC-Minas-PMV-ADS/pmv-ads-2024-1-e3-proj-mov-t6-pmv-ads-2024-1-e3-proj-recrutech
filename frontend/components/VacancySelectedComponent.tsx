import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontSize, Spacing } from "@/constants/Sizes";
import { VacancyInterfaces } from "@/types/Vacancy.interfaces";
import { router, useNavigation, useRouter } from "expo-router";
import { applyCvToVacancy } from "@/services/vacancyService";
import { useEffect, useState } from "react";
import { string } from "yup";


interface VacancyCardProps {
  vacancySelected: VacancyInterfaces.Receive.Create;
}
const VacancyCard: React.FC<VacancyCardProps> = ({ vacancySelected }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = localStorage.getItem('session');
        if (userData !== null) {
 
          const userObject = JSON.parse(userData);
          setUserId(userObject.userData.id);
        }
      } catch (error) {
        console.error('Failed to fetch the user data from storage', error);
      }
    };

    fetchUserId();
  }, []);

  const handleBackPress = () => {
    router.push("/home/");
  };

  const applyCv = async (vacancyId: string, userId: string) => {
    await applyCvToVacancy(vacancyId, userId);
    router.push("/home/");
  };

  if (userId === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.body}>
        <Text style={styles.largeText}>{vacancySelected.name}</Text>
        <View style={styles.cardsContainer}>
          {vacancySelected.requirements.map(x => (
            <View key={x} style={styles.cardRequirement}>{x.toString()}</View>
          ))}
        </View>
      </View>
      <View style={styles.additionalInfo}>
        <View style={styles.infoColumn}>
          <Text style={styles.boldText}>{vacancySelected.enterprise}</Text>
          <Text>{vacancySelected.location}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.boldText}>Salário</Text>
          <Text>{vacancySelected.remuneration}</Text>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        {vacancySelected.requirements.map(x => (
          <View key={x} style={styles.cardRequirementGreen}>{x.toString()}</View>
        ))}
      </View>
      <View style={styles.contentContainer}>
        <Text>{vacancySelected.content}</Text>
      </View>
      <View style={styles.contentContainer}>
        {vacancySelected.benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefitText}>• {benefit}</Text>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackPress}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyCv(vacancySelected.id, userId)} style={[styles.button, styles.greenButton]}>
          <Text style={styles.buttonText}>Candidatar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  Header: {
    fontFamily: "Roboto-Regular",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight:"bold",
    fontSize: FontSize.medium,
    marginBottom:40
   
  }, 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cardsContainer:{
    flexDirection:"row",
    marginBottom:40
  },
  smallText: {
    fontSize: FontSize.small,
  },
  mediumText: {
    fontSize: FontSize.medium,
  },
  largeText: {
    fontSize: FontSize.extraLarge,
    fontWeight:"700",
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap:10
  },
  cardRequirement:{
    backgroundColor:"#0E1824",
    borderRadius: 40,
    paddingTop: 5,  
    paddingRight: 20,  
    paddingBottom: 5, 
    paddingLeft: 20, 
    marginRight: 10,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    color:"#FFFFFF",
  }, 
  cardRequirementGreen:{
    backgroundColor:"#2DC672",
    borderRadius: 40,
    paddingTop: 5,  
    paddingRight: 20,  
    paddingBottom: 5, 
    paddingLeft: 20, 
    marginRight: 10,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    color:"#0E1824",
  },
  additionalInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:30,
    fontSize:FontSize.medium
  },
  infoColumn: {
    flexDirection: 'column',
  },
  boldText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    marginBottom:40,
    width:600
},
benefitText: {
    marginBottom: 8,
    textAlign: 'left',
},
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
 button: {
  flex: 1,
  marginHorizontal: 8,
  padding: 12,
  backgroundColor: '#ccc',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
greenButton: {
  backgroundColor: '#2DC672',
},
buttonText: {
  color: '#0E1824',
  fontSize: 16,
}
});

export default VacancyCard;