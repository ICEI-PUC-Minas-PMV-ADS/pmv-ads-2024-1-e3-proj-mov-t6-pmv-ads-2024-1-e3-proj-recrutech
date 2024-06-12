import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDownPicker from "react-native-dropdown-picker";

import { Colors } from "@/constants/Colors";
import { FontSize, Spacing } from "@/constants/Sizes";

import DefaultButton from "@/components/DefaultButton";
import createVacancySchema from "@/schemas/vacancySchema";
import { renderTextField } from "@/utils/renderTextField";
import {
  Office,
  Contract,
  VacancyInterfaces,
} from "@/types/Vacancy.interfaces";
import { useSession } from "@/context/AuthContext";
import { createVacancy } from "@/services/vacancyService";
import { router } from "expo-router";

export const usePickerState = (
  initialItems: { label: string; value: any; key?: number }[]
) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(initialItems);

  return { open, setOpen, value, setValue, items, setItems };
};

const VacancyForm = (): React.JSX.Element => {
  const { session } = useSession();
  const userId = session!.userData.id;

  const contractTypesState = usePickerState([
    { label: "Remoto", value: Contract.Remoto, key: 1 },
    { label: "Híbrido", value: Contract.Híbrido, key: 2 },
    { label: "Presencial", value: Contract.Remoto, key: 3 },
  ]);

  const requirementStates = usePickerState(
    [
      { label: "Java", value: "java" },
      { label: "Node", value: "node" },
      { label: "React", value: "react" },
      { label: "Python", value: "python" },
      { label: "Angular", value: "angular" },
      { label: "Vue", value: "vue" },
      { label: "C#", value: "c#" },
      { label: "C++", value: "c++" },
      { label: "PHP", value: "php" },
      { label: "Ruby", value: "ruby" },
      { label: "Swift", value: "swift" },
      { label: "Kotlin", value: "kotlin" },
      { label: "Flutter", value: "flutter" },
      { label: "Dart", value: "dart" },
      { label: "SQL", value: "sql" },
      { label: "NoSQL", value: "nosql" },
      { label: "MongoDB", value: "mongodb" },
      { label: "Firebase", value: "firebase" },
      { label: "AWS", value: "aws" },
      { label: "Azure", value: "azure" },
      { label: "Google Cloud", value: "google cloud" },
      { label: "Docker", value: "docker" },
      { label: "Kubernetes", value: "kubernetes" },
      { label: "Jenkins", value: "jenkins" },
      { label: "Git", value: "git" },
      { label: "SVN", value: "svn" },
      { label: "Agile", value: "agile" },
      { label: "Scrum", value: "scrum" },
      { label: "Kanban", value: "kanban" },
      { label: "XP", value: "xp" },
      { label: "TDD", value: "tdd" },
      { label: "BDD", value: "bdd" },
      { label: "DDD", value: "ddd" },
      { label: "Clean Code", value: "clean code" },
      { label: "SOLID", value: "solid" },
      { label: "Design Patterns", value: "design patterns" },
      { label: "Microservices", value: "microservices" },
      { label: "Serverless", value: "serverless" },
      { label: "REST", value: "rest" },
      { label: "GraphQL", value: "graphql" },
    ].map((item, index) => ({ ...item, key: index.toString() } as any))
  );

  const seniorityStates = usePickerState([
    { label: "Estagiário", value: Office.Estágio, key: 1 },
    { label: "Júnior", value: Office.Júnior, key: 2 },
    { label: "Pleno", value: Office.Pleno, key: 3 },
    { label: "Sênior", value: Office.Sênior, key: 4 },
  ]);

  const benefitsStates = usePickerState([
    { label: "Vale Alimentação", value: "Vale alimentação", key: 1 },
    { label: "Vale Refeição", value: "Vale Refeição", key: 2 },
    { label: "Vale transporte", value: "Vale transporte", key: 3 },
    { label: "Convênio médico", value: "Convênio médico", key: 4 },
    { label: "Convênio odontológico", value: "Convênio odontológico", key: 5 },
  ]);

  const defaultValues: VacancyInterfaces.Send.Create =
    {} as VacancyInterfaces.Send.Create;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVacancySchema),
    defaultValues,
  });

  const onSubmit = async (data: VacancyInterfaces.Send.Create) => {
    data = {
      ...data,
      userId,
      benefits: benefitsStates.value,
      requirements: requirementStates.value,
    };

    createVacancy(data)
      .then(() => {
        router.replace("/home/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.newVacancy}>Cadastrar nova vaga</Text>
      <Controller
        name="name"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Título:",
            variant: "primary",
            placeholder: "Ex: Desenvolvedor Fullstack",
            error: errors.name?.message,
          })
        }
        rules={{ required: true }}
      />
      <Controller
        name="enterprise"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Empresa:",
            variant: "primary",
            placeholder: "Ex: Google",
            error: errors.enterprise?.message,
          })
        }
        rules={{ required: true }}
      />
      <View>
        <Text style={styles.labelPicker}>Cargo:</Text>
        <DropDownPicker
          mode="BADGE"
          theme="LIGHT"
          multiple={false}
          style={styles.picker}
          items={seniorityStates.items}
          open={seniorityStates.open}
          value={seniorityStates.value}
          setOpen={seniorityStates.setOpen}
          setValue={seniorityStates.setValue}
          setItems={seniorityStates.setItems}
          badgeDotColors={[Colors.green]}
        />
      </View>
      <Controller
        name="location"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Local:",
            variant: "primary",
            placeholder: "Ex: Belo Horizonte - MG",
            error: errors.location?.message,
          })
        }
        rules={{ required: true }}
      />
      <Controller
        name="link"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Link:",
            variant: "primary",
            placeholder: "Ex: https://google.com",
            error: errors.link?.message,
          })
        }
        rules={{ required: true }}
      />
      <View>
        <Text style={styles.labelPicker}>Tipo de contrato:</Text>
        <DropDownPicker
          mode="BADGE"
          theme="LIGHT"
          multiple={false}
          style={styles.picker}
          itemKey="key"
          items={contractTypesState.items}
          open={contractTypesState.open}
          value={contractTypesState.value}
          setOpen={contractTypesState.setOpen}
          setValue={contractTypesState.setValue}
          setItems={contractTypesState.setItems}
          badgeDotColors={[Colors.green]}
          key={Math.random()}
        />
      </View>
      <Controller
        name="content"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Descrição e requisitos:",
            variant: "primary",
            placeholder: "Ex: Desenvolvimento de aplicações web e mobile...",
            error: errors.content?.message,
          })
        }
      />
      <View>
        <Text style={styles.labelPicker}>Benefícios</Text>
        <DropDownPicker
          mode="BADGE"
          theme="LIGHT"
          multiple={true}
          searchable={true}
          itemKey="key"
          addCustomItem={true}
          style={styles.picker}
          open={benefitsStates.open}
          items={benefitsStates.items}
          value={benefitsStates.value}
          setOpen={benefitsStates.setOpen}
          setValue={benefitsStates.setValue}
          setItems={benefitsStates.setItems}
          badgeDotColors={[Colors.green]}
        />
      </View>
      <Controller
        name="remuneration"
        control={control}
        render={(props) =>
          renderTextField({
            ...props,
            label: "Salário:",
            variant: "primary",
            placeholder: "Ex: R$ 4000,00",
            error: errors.remuneration?.message,
          })
        }
      />

      <View>
        <Text style={styles.labelPicker}>Requisitos</Text>
        <DropDownPicker
          mode="BADGE"
          theme="LIGHT"
          multiple={true}
          searchable={true}
          itemKey="key"
          addCustomItem={true}
          style={styles.picker}
          open={requirementStates.open}
          items={requirementStates.items}
          value={requirementStates.value}
          setOpen={requirementStates.setOpen}
          setValue={requirementStates.setValue}
          setItems={requirementStates.setItems}
          badgeDotColors={[Colors.green]}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <DefaultButton
          title="Voltar"
          variant="secondary"
          moreStyles={{ color: Colors.black, backgroundColor: Colors.white }}
          onPress={() => {
            router.replace("/home/");
          }}
        />
        <DefaultButton
          title="Finalizar"
          onPress={handleSubmit(onSubmit)}
          moreStyles={{ color: Colors.black, backgroundColor: Colors.darkBlue }}
        />
      </View>
    </View>
  );
};

export default function CreateVacancy(): React.JSX.Element {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[{ key: "content" }]}
      style={styles.list}
      renderItem={() => <VacancyForm />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: "95%",
    maxWidth: 320,
    elevation: 15,
    shadowOpacity: 0.5,
    padding: Spacing.medium,
    marginTop: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: Spacing.smallMedium,
  },
  container: {
    gap: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: Spacing.smallMedium,
    paddingBottom: Spacing.extraLarge,
  },
  newVacancy: {
    textAlign: "center",
    fontSize: FontSize.medium,
    fontFamily: "Roboto-Regular",
  },
  picker: {
    marginVertical: Spacing.small,
    borderRadius: Spacing.medium,
  },
  labelPicker: {
    fontFamily: "Roboto-Light",
  },
  buttonsWrapper: {
    flexDirection: "row",
    fontFamily: "Roboto-Bold",
    justifyContent: "space-between",
  },
});
