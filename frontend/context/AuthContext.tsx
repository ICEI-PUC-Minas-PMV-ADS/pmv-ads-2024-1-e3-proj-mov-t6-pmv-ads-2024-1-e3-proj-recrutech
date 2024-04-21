import React from "react";

import { signIn } from "@/utils/auth";
import { useStorageState } from "@/hooks/useStorageState";
import ToastComponent from "@/components/ToastComponent";

export interface AuthContextProps {
  session: string | null;
  isLoading: boolean;
  signOut: Function;
  signIn: Function;
}

const AuthContext = React.createContext<AuthContextProps>({
  session: null,
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export function useSession(): AuthContextProps {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(
  props: React.PropsWithChildren
): React.JSX.Element {
  const [[isLoading, session], setSession] = useStorageState("session");

  React.useEffect(() => {}, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
      <ToastComponent />
    </AuthContext.Provider>
  );
}
