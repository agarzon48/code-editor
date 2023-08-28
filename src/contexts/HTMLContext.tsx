import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { html } from "@codemirror/lang-html";

const defaultContext = {
  lang: html(),
  title: "HTML",
  value: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
};

const HTMLContext = createContext(defaultContext);

export const HTMLContextProvider = ({ children }: ContextType) => {
  const [value, setValue] = useState("");
  const [lastUpdate, setLastUpdate] = useState({});

  const handleUserInput = useCallback((value: string, viewUpdate: object) => {
    setValue(value);
    setLastUpdate(viewUpdate);
  }, []);

  const memoedValue = useMemo(
    () => ({ ...defaultContext, value, handleUserInput, lastUpdate }),
    [value, lastUpdate, handleUserInput]
  );

  return (
    <HTMLContext.Provider value={memoedValue}>{children}</HTMLContext.Provider>
  );
};

const useHTMLContext = () => useContext(HTMLContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useHTMLContext;

type ContextType = {
  children: ReactNode;
};
