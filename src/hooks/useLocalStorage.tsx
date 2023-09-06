import { useState, useEffect } from "react";

const useLocalStorage = ({ tag }: useLocalStorageType) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(tag);
    return stickyValue !== null ? JSON.parse(stickyValue) : "";
  });

  useEffect(() => {
    window.localStorage.setItem(tag, JSON.stringify(value));
  }, [tag, value]);

  const handleValueChange: (value: availableValuesType) => void = (value) =>
    setValue(value);

  return [value, handleValueChange];
};

export default useLocalStorage;

type availableValuesType = [
  object,
  string,
  number,
  boolean,
  object[],
  string[],
  number[],
  boolean[]
];

type useLocalStorageType = {
  tag: string;
};
