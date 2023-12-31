import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { javascript } from "@codemirror/lang-javascript";

import useLocalStorage from "../hooks/useLocalStorage";
import generateFile from "./utils/generateFile";

import jsLogo from "../assets/imgs/JS-logo.webp";

const defaultContext = {
  lang: javascript({ jsx: true }),
  title: "JavaScript",
  value: "",
  logo: jsLogo,
  open: true,
  id: "js",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
  closeEditor: () => {},
  openEditor: () => {},
  downloadFile: () => {},
};

const JSContext = createContext(defaultContext);

export const JSContextProvider = ({ children }: ContextType) => {
  const [lastUpdate, setLastUpdate] = useState({});
  const [open, setOpen] = useState(true);
  const [LSValue, setLSValue] = useLocalStorage({ tag: "js" });
  const [value, setValue] = useState(LSValue);

  const closeEditor = useCallback(() => {
    setOpen(false);
  }, []);

  const openEditor = useCallback(() => {
    setOpen(true);
  }, []);

  const handleUserInput = useCallback(
    (value: string, viewUpdate: object) => {
      setValue(value);
      setLastUpdate(viewUpdate);
      setLSValue(value);
    },
    [setLSValue]
  );

  const downloadFile = useCallback(() => {
    generateFile({ format: "js", content: value, name: "scripts" });
  }, [value]);

  const memoedValue = useMemo(
    () => ({
      ...defaultContext,
      value,
      open,
      closeEditor,
      openEditor,
      handleUserInput,
      lastUpdate,
      downloadFile,
    }),
    [
      value,
      open,
      closeEditor,
      openEditor,
      handleUserInput,
      lastUpdate,
      downloadFile,
    ]
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
