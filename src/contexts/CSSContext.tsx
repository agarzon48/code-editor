import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { css } from "@codemirror/lang-css";

import useLocalStorage from "../hooks/useLocalStorage";
import generateFile from "./utils/generateFile";

import cssLogo from "../assets/imgs/CSS-logo.webp";

const defaultContext = {
  lang: css(),
  title: "CSS",
  value: "",
  logo: cssLogo,
  open: true,
  id: "css",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
  closeEditor: () => {},
  openEditor: () => {},
  downloadFile: () => {},
};

const CSSContext = createContext(defaultContext);

export const CSSContextProvider = ({ children }: ContextType) => {
  const [lastUpdate, setLastUpdate] = useState({});
  const [open, setOpen] = useState(true);
  const [LSValue, setLSValue] = useLocalStorage({ tag: "css" });
  const [value, setValue] = useState(LSValue);

  const handleUserInput = useCallback(
    (value: string, viewUpdate: object) => {
      setValue(value);
      setLastUpdate(viewUpdate);
      setLSValue(value);
    },
    [setLSValue]
  );

  const closeEditor = useCallback(() => {
    setOpen(false);
  }, []);

  const openEditor = useCallback(() => {
    setOpen(true);
  }, []);

  const downloadFile = useCallback(() => {
    generateFile({ format: "css", content: value, name: "styles" });
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
      downloadFile,
      lastUpdate,
    ]
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
