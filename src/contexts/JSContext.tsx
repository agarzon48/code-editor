import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { javascript } from "@codemirror/lang-javascript";

const defaultContext = {
  lang: javascript({ jsx: true }),
  title: "JavaScript",
  value: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
};

const JSContext = createContext(defaultContext);

export const JSContextProvider = ({ children }: ContextType) => {
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
    <JSContext.Provider value={memoedValue}>{children}</JSContext.Provider>
  );
};

const useJSContext = () => useContext(JSContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useJSContext;

type ContextType = {
  children: ReactNode;
};
