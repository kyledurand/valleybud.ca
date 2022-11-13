import { useState, useEffect } from "react";

export function useSessionStorage(key: string, defaultValue = "") {
  if (typeof window === "undefined") return [];
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const value = sessionStorage.getItem(key);
    setValue(value || defaultValue);
  }, [key]);

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
