import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { css } from "@codemirror/lang-css";

const defaultContext = {
  lang: css(),
  title: "CSS",
  value: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
};

const CSSContext = createContext(defaultContext);

export const CSSContextProvider = ({ children }: ContextType) => {
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
    <CSSContext.Provider value={memoedValue}>{children}</CSSContext.Provider>
  );
};

const useCSSContext = () => useContext(CSSContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useCSSContext;

type ContextType = {
  children: ReactNode;
};
