import {useState, useEffect} from "react";

export function useSessionStorage(
  key: string,
  defaultValue = ""
): [string, (value: string) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const value = sessionStorage.getItem(key);
    setValue(value || defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
