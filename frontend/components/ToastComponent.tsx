import { Spacing } from "@/constants/Sizes";
import { StyleSheet } from "react-native";

import ToastManager from "toastify-react-native";

export default function ToastComponent() {
  return <ToastManager style={styles.toast} />;
}

const styles = StyleSheet.create({
  toast: {
    top: 0,
    width: "100%",
    maxWidth: 376,
    height: "auto",
    paddingVertical: Spacing.small,
  },
});
