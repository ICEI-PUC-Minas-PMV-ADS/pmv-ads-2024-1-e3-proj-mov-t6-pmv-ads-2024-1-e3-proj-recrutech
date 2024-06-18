import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";
import { useEffect, useState } from "react";
import { useSession } from "@/context/AuthContext";
import {
  CreateRecommendation,
  createReccomendation,
} from "@/services/reccomendationService";

export default function ReccomendationModalComponent({
  userId,
  openModal,
  receiverName,
  setOpenModal,
}: {
  userId: number;
  openModal: boolean;
  setOpenModal: Function;
  receiverName: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const { session } = useSession();

  if (!session) return null;

  const submit = () => {
    const { id } = session.userData;
    const data: CreateRecommendation = {
      description: inputValue,
      providerId: id,
    };

    createReccomendation(userId, data)
      .then((response) => {
        console.log(response.data);
        ToastAndroid.show("Recomendação enviada", 4000);
        setOpenModal(false);
      })
      .catch((error) => {
        ToastAndroid.show("Erro ao enviar recomendação", 4000);
      });
  };

  useEffect(() => {
    setOpenModal(openModal);
  }, [openModal]);

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>
            Recomendar {receiverName + " " + userId}
          </Text>
        </View>
        <TextInput
          editable
          multiline
          value={inputValue}
          onChangeText={setInputValue}
          numberOfLines={11}
          style={styles.textInput}
        />
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            activeOpacity={0.9}
            onPress={() => {
              setOpenModal(false);
            }}
          >
            <Text style={styles.backButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            activeOpacity={0.9}
            onPress={submit}
          >
            <Text style={styles.confirmButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 320,
    maxHeight: 340,
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    shadowOpacity: 0.5,
    alignItems: "center",
    elevation: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: Spacing.medium,
  },
  modalHeader: {
    padding: Spacing.medium,
  },
  headerTitle: {
    fontSize: FontSize.medium,
  },
  textInput: {
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    textAlignVertical: "top",
    padding: Spacing.medium,
    borderColor: Colors.green,
    marginBottom: Spacing.medium,
    borderRadius: Spacing.medium,
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    gap: Spacing.medium,
    justifyContent: "center",
  },
  button: {
    width: 100,
    padding: Spacing.small,
    borderRadius: Spacing.smallMedium,
  },
  backButton: {},
  backButtonText: {
    color: Colors.black,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: Colors.green,
  },
  confirmButtonText: {
    color: Colors.white,
    textAlign: "center",
  },
});
