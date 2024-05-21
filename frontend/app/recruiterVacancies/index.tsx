
import { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from "react-native";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { initializeFonts } from "@/utils/helpers";

import AppTitle from "@/components/AppTitleComponent";
import DefaultButton from "@/components/DefaultButton";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import RecentVacancyCard from "@/components/RecentVacancyCard";

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { fontsLoaded, fontError } = initializeFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.mainContainer} onLayout={onLayoutRootView}>
      <View style={styles.headerContainer}>
      
        <Text style={styles.titleText}>Sua vaga possui atualmente:</Text>
      <Ionicons name="arrow-back-circle-outline" size={24}  style={styles.Backicon} />
         <Text style={styles.defaultText}>16 Candidaturas</Text>
         <View style={styles.headerStyle}>
        <Text  style={styles.seniorityText}> FrontEnd Developer </Text>
        <TouchableOpacity  >
        <Ionicons name="create-outline" size={24}  style={styles.icon} />
      </TouchableOpacity>
         </View>
         <View style={styles.vanciesProperties}>
          <Text style={styles.vanciesPropertiesText}>Junior</Text>
          <Text style={styles.vanciesPropertiesText}>Remoto</Text>
          <Text style={styles.vanciesPropertiesText}>CLT</Text>
       </View>

       <View style={styles.detailsVacancies}>
        <Text style={styles.companyName}> SYDLE  </Text>
        <Text style={styles.salaryValue}>Salário</Text>
      </View>

        <View style={styles.detailsVacancies}>
          
          <Text style={styles.CityText}> Belo Horizonte - MG             </Text>
          <Text style={styles.defaultText}> R$ 3100,00 </Text>
        </View>

      </View>
      
        <Text  style={styles.applications} > Candidaturas:</Text>
        <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={Array(3)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.vacancyItemContainer}
          renderItem={({ index, item }) => (
            <RecentVacancyCard
              title="Joao Pedro"
              seniority="JAVA"
              workingModel="Angular"
              enterprise="Cadidatou-se 4h atrás"
            /> 
          )}
        />
      </ScrollView>
      <View style={styles.bodyContainer}>
        <DefaultButton
          title="Finalizar Vaga"
          variant="secondary"
          link={{
            pathname: "/sign-in/dev",
          }}
          moreStyles={styles.button}
        />
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.extraLarge,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  headerContainer: {
    alignItems: "center",
    gap: Spacing.medium,
  },
  bodyContainer: {
    gap: Spacing.smallMedium,
    maxWidth: 200,
  },
  scrollContainer: {
    flex: 2,
  },
  Backicon:{
    fontSize: FontSize.extraLarge, 
    color: Colors.green,
    marginRight: 300,
    borderRadius:15,

    
  
  },

  titleText:{
    color: Colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    marginTop:20,
    marginBottom: -45
  },
  CityText:{
    fontFamily: "Roboto-Regular",
    
  },
  defaultText: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
    
    
  },
  seniorityText:{
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.extraLarge,

  },
  applications:{
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.extraLarge,

  },
  headerStyle:{
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    fontSize: FontSize.extraLarge, 
    color: Colors.green,
    marginRight: 1, 
  },
  vanciesProperties:{
    flexDirection: 'row', 
    gap: 40,
   
  },
  vanciesPropertiesText: {
   
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    backgroundColor:Colors.darkBlue,
    color: 'white', 
    padding: 3, 
    borderRadius: 30, 
    paddingVertical: 5,
    paddingHorizontal: 13,
    
  },

  detailsVacancies: {
    flexDirection: 'row', 
    marginRight: 10,
    marginTop: -5
  },
  companyName: {
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: FontSize.medium,
    marginRight: 130,
    
  },
  salaryValue: {
    color: Colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: FontSize.medium,
    marginRight: 25
  },
  recentViwedTitle: {
    fontSize: FontSize.large,
    fontFamily: "Roboto-Regular",
    marginBottom: Spacing.medium,
  },
  vacancyItemContainer: {
    gap: Spacing.medium,
    alignItems: "center",
    paddingBottom: Spacing.medium,
  },
  button: {
    marginBottom: 10,
  },
});
