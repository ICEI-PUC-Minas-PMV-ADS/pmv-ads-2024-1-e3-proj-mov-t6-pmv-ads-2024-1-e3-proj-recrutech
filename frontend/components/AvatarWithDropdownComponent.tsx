import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { signOut } from "@/utils/auth";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Sizes";

enum OptionTypes {
  LOGOUT = "logout",
  PROFILE = "profile",
}

interface ProfileOption {
  label: string;
  value: OptionTypes;
}

const optionsHandlers: Record<OptionTypes, Function> = {
  [OptionTypes.LOGOUT]: () => signOut(),
  [OptionTypes.PROFILE]: () => router.push("/home/(developer)/userProfile"),
};

const dropDownOptions: ProfileOption[] = [
  { label: "Perfil", value: OptionTypes.PROFILE },
  { label: "Sair", value: OptionTypes.LOGOUT },
];

const handleOptionselected = (option: ProfileOption) => {
  optionsHandlers[option.value]();
};

const AvatarWithDropdown = ({ userPhoto }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Image source={{ uri: userPhoto }} style={styles.avatar} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {dropDownOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleOptionselected(option)}
            >
              <Text style={styles.dropdownItem}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  dropdown: {
    top: 50,
    zIndex: 2,
    width: 100,
    gap: Spacing.small,
    position: "absolute",
    padding: Spacing.small,
    backgroundColor: "#fff",
    borderRadius: Spacing.small,
    ...Platform.select({
      ios: {
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 20,
      },
    }),
  },
  dropdownItem: {
    fontFamily: "Roboto-Regular",
  },
});

export default AvatarWithDropdown;
