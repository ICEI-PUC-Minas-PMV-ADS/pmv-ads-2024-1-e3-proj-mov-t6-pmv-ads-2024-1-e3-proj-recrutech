
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { initializeFonts } from "@/utils/helpers";


import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import VacancySelectedComponent from "@/components/VacancySelectedComponent";
import { getVacancyById } from "@/services/vacancyService";
import { VacancyInterfaces } from "@/types/Vacancy.interfaces";



SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { vacancyId } = useLocalSearchParams();
  const [vacancySelected, setVacancySelected] = useState<VacancyInterfaces.Receive.Create | null>(null);
  const [loading, setLoading] = useState(true);
  const { fontsLoaded, fontError } = initializeFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof vacancyId === 'string') {
          const data = await getVacancyById(vacancyId);
          setVacancySelected(data || null);
        }
      } catch (error) {
        console.error('Error fetching vacancy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vacancyId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!vacancySelected) {
    return <Text>No vacancy found.</Text>;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.mainContainer}>
      <VacancySelectedComponent vacancySelected={vacancySelected} />
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
