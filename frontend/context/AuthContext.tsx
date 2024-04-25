import React from "react";

import { signIn } from "@/utils/auth";
import { useStorageState } from "@/hooks/useStorageState";

import { Session } from "@/types/Session.interfaces";
import ToastComponent from "@/components/ToastComponent";

export interface AuthContextProps {
  signIn: Function;
  signOut: Function;
  session: Session | null;
  setSession: (data: Session | null) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  session: null,
  signIn: () => {},
  signOut: () => {},
  setSession: () => {},
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
  const [session, setSession] = useStorageState<Session>("session");

  return (
    <AuthContext.Provider
      value={{
        signIn,
        session,
        setSession,
        signOut: () => {
          setSession(null);
        },
      }}
    >
      {props.children}
      <ToastComponent />
    </AuthContext.Provider>
  );
}
