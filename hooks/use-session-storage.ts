import { useState, useEffect, useCallback } from "react";
import { parse } from "../lib/utils";

type SetValue<T> = T | ((prevValue: T) => T);

const useSessionStorage = <T = any>(
  key: string,
  initialValue?: T,
): {
  value: T | undefined;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
} => {
  const [state, setState] = useState<T | undefined>(initialValue); // Initialize with initialValue

  const setValue = useCallback(
    (valueOrFn: SetValue<T>) => {
      const newValue =
        valueOrFn instanceof Function ? valueOrFn(state as T) : valueOrFn;
      if (typeof window !== "undefined" && key) {
        window.sessionStorage.setItem(key, JSON.stringify(newValue));

        window.dispatchEvent(
          new CustomEvent(`session-storage-${key}`, {
            detail: { key, value: newValue },
          }),
        );
      }
      setState(newValue);
    },
    [key, state],
  );

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined" && key) {
      window.sessionStorage.removeItem(key);

      window.dispatchEvent(
        new CustomEvent(`session-storage-${key}`, {
          detail: { key, value: undefined },
        }),
      );
    }
    setState(undefined);
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        typeof window !== "undefined" &&
        e.storageArea === window.sessionStorage &&
        e.key === key
      ) {
        setState(e.newValue ? parse(e.newValue) : undefined);
      }
    };

    const handleCustomChange = (e: CustomEvent<{ key: string; value: T }>) => {
      if (typeof window !== "undefined" && e.detail.key === key) {
        setState(e.detail.value);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(
        `session-storage-${key}`,
        handleCustomChange as EventListener,
      );
    }

    if (typeof window !== "undefined") {
      const savedValue = window.sessionStorage.getItem(key);
      if (savedValue) {
        window.dispatchEvent(
          new CustomEvent(`session-storage-${key}`, {
            detail: { key, value: parse(savedValue) },
          }),
        );
      }
      setState(savedValue ? parse(savedValue) : undefined);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          `session-storage-${key}`,
          handleCustomChange as EventListener,
        );
      }
    };
  }, [key]);

  return { value: state, setValue, removeValue };
};

export default useSessionStorage;
