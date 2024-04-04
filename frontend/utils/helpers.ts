import * as Font from "expo-font";

export const initializeFonts = (): {
  fontsLoaded: boolean;
  fontError: Error | null;
} => {
  const fonts: Record<string, any> = {
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("@/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
  };

  const [fontsLoaded, fontError] = Font.useFonts(fonts);

  return { fontsLoaded, fontError };
};
