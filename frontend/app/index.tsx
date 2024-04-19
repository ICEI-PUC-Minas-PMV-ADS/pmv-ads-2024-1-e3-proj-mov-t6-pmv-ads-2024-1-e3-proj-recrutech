
import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { preventAutoHideAsync } from "expo-splash-screen";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { initializeFonts } from "@/utils/helpers";

import AppTitle from "@/components/AppTitleComponent";
import DefaultButton from "@/components/DefaultButton";


import ToastManager from "toastify-react-native";

preventAutoHideAsync();

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Bem vindo, <Text style={{ color: Colors.green }}>Candidato!</Text>
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Pesquisar"
          />
          <TouchableOpacity style={styles.searchIcon}>
            <AntDesign name="search1" size={24} color={Colors.green} />
          </TouchableOpacity>
          <FontAwesome
            name="sliders"
            size={18}
            color="black"
            style={{ marginLeft: 40 }}
            library="solid"
          />
        </View>
        <Text style={[styles.lastSeen]}>Vistas recentemente </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.text, styles.largeText]}>
          FrontEnd Developer{" "}
          <FontAwesome
            name="star"
            size={18}
            color="gold"
            style={{ marginLeft: 25 }}
          />
        </Text>

        <Text style={[styles.text, styles.mediumText]}>Banco Mercantil</Text>
        <Text style={[styles.text, styles.smallText]}>Estágio</Text>
        <Text style={[styles.text, styles.smallText]}>Belo Horizonte - MG</Text>
        <Text style={[styles.text, styles.smallText]}>
          R$ 1300,00 <Text style={styles.markedText}>HÍBRIDO</Text>
        </Text>
        <Text style={[styles.text, styles.smallText]}>Mensal</Text>
      </View>

      <Text style={[styles.recentVacancies]}>Vagas Recentes</Text>

      <View  style={[styles.cards]}>


      <View style={styles.card1}>
        <Text style={styles.office}>
          UI Designer <Text style={styles.markedText}>HÍBRIDO</Text>
        </Text>
        <Text>
          {" "}
          Localiza <Text style={styles.senioridade1}>Pleno</Text>{" "}
        </Text>
      </View>

      {
        <View style={styles.card1}>
          <Text style={styles.descricaoVaga}>
            FrontEnd Developer<Text style={styles.markedText1}>HÍBRIDO</Text>
          </Text>
          <Text>
            Sydle <Text style={styles.senioridade}>Junior</Text>
          </Text>
        </View>
      }
      <ToastManager />
    </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.medium,
    
  },
  inputContainer: {
    width: "80%",
    marginBottom: Spacing.medium,
  },
  label: {
    fontSize: FontSize.medium,
    marginBottom: Spacing.extraSmall,
    padding: 5,
    fontFamily: "Roboto-Bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "none",
    borderWidth: 1,
    borderRadius: Spacing.smallMedium,
    paddingHorizontal: Spacing.medium,
  },
  input: {
    flex: 1,
    fontSize: FontSize.medium,
    paddingVertical: Spacing.small,
    color: Colors.gray,
  },
  searchIcon: {
    marginLeft: Spacing.extraSmall,
    color: Colors.green,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: Colors.darkBlue,
    padding: Spacing.medium,
    borderRadius: Spacing.small,
    width: "85%",
    height: "30%",
    marginBottom: -15,
    marginTop:-20,
  },
  text: {
    color: Colors.white,
    marginBottom: Spacing.small,
  },
  smallText: {
    fontSize: FontSize.small,
  },
  mediumText: {
    fontSize: FontSize.medium,
  },
  largeText: {
    fontSize: FontSize.large,
    color: Colors.green,
  },
  recentVacancies: {
    fontSize: FontSize.large,
    //marginTop:35,
    //padding: 3,
    fontFamily: "Roboto-Bold",
    width: "100%",
    margin: 35,
    marginLeft: "50%",
    marginBottom: 10,
  },

  lastSeen: {
    fontSize: FontSize.large,
    //marginTop:35,
    //padding: 3,
    fontFamily: "Roboto-Bold",
    width: "100%",
    margin: 25,
  },
  card1: {
    paddingTop: 20,
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    marginTop:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 9,
    width: "95%",
    height: "45%",
  },
  markedText: {
    marginTop: 20,
    gap:20,
    backgroundColor: Colors.green,
    borderRadius: 15,
    padding: 6,
    width: 710,
    marginBottom: -10,
    marginLeft: 110,
    textDecorationColor: Colors.black,
    color: Colors.black,
  },
  descricaoVaga: {
    fontSize:FontSize.small,
  },

  markedText1: {
   
    marginTop: "auto",
    backgroundColor: Colors.green,
    borderRadius: 15,
    padding: 6,
    width: 90,
    marginBottom: 30,
    marginLeft: 65,
    textDecorationColor: Colors.black,
    color: Colors.black,
  },

  senioridade: {
    marginLeft: 200,
    padding: 1,
    marginEnd: 10,
    gap: 10,
  },

  senioridade1:{
    marginLeft: "54%",
    padding: -15,
    marginBottom: -20
    
  },

  office: {
    padding: 5
  },
  cards: {
    //marginTop: 10,
    padding: 10,
    gap: 10,
    //display:"flex"
  }
});
