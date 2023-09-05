import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { html } from "@codemirror/lang-html";

import htmlLogo from "../assets/imgs/HTML-logo.webp";

const defaultContext = {
  lang: html(),
  title: "HTML",
  value: "",
  logo: htmlLogo,
  open: true,
  id: "html",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
  closeEditor: () => {},
  openEditor: () => {},
};

const HTMLContext = createContext(defaultContext);

export const HTMLContextProvider = ({ children }: ContextType) => {
  const [value, setValue] = useState("");
  const [lastUpdate, setLastUpdate] = useState({});
  const [open, setOpen] = useState(true);

  const closeEditor = useCallback(() => {
    setOpen(false);
  }, []);

  const openEditor = useCallback(() => {
    setOpen(true);
  }, []);

  const handleUserInput = useCallback((value: string, viewUpdate: object) => {
    setValue(value);
    setLastUpdate(viewUpdate);
  }, []);

  const memoedValue = useMemo(
    () => ({
      ...defaultContext,
      open,
      closeEditor,
      openEditor,
      value,
      handleUserInput,
      lastUpdate,
    }),
    [open, closeEditor, openEditor, value, handleUserInput, lastUpdate]
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
