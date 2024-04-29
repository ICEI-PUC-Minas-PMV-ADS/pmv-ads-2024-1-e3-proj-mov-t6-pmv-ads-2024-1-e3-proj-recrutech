import React from "react";

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [T | null, (value: T | null) => void];

function useAsyncState<T>(initialValue: T | null = null): UseStateHook<T> {
  return React.useReducer(
    (_: T | null, action: T | null = null): T | null => action,
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState<T>(key: string): UseStateHook<T | null> {
  const [state, setState] = useAsyncState<T>();

  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          const storedData = localStorage.getItem(key);

          storedData !== null
            ? setState(JSON.parse(storedData) as T)
            : setState(null);
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key)
        .then((value) => {
          value && setState(JSON.parse(value));
          // value !== null ? setState(JSON.parse(value) as T) : setState(value);
        })
        .catch((e) => {
          console.error("Secure store is unavailable:", e);
        });
    }
  }, [key]);

  const setValue = React.useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, JSON.stringify(value));
    },
    [key]
  );

  return [state, setValue];
}
