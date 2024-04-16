import { Slot } from "expo-router";

import { SessionProvider } from "@/context/AuthContext";

export default function AppLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
