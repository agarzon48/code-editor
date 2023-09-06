import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { html } from "@codemirror/lang-html";

import { htmlHeadInit, htmlHeadEnd } from "./utils/htmlHead";
import useLocalStorage from "../hooks/useLocalStorage";
import generateHTMLFile from "./utils/generateHTMLFile";

import htmlLogo from "../assets/imgs/HTML-logo.webp";

const defaultContext = {
  lang: html(),
  title: "HTML",
  value: "",
  logo: htmlLogo,
  open: true,
  id: "html",
  head: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput: (_value: string, _viewUpdate: object) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertHTMLHead: (_customHeadString: string) => {},
  closeEditor: () => {},
  openEditor: () => {},
  downloadFile: () => {},
};

const HTMLContext = createContext(defaultContext);

export const HTMLContextProvider = ({ children }: ContextType) => {
  const [lastUpdate, setLastUpdate] = useState({});
  const [open, setOpen] = useState(true);
  const [LSValue, setLSValue] = useLocalStorage({ tag: "html" });
  const [value, setValue] = useState(LSValue);
  const [head, setHead] = useState(htmlHeadInit + htmlHeadEnd);

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
    generateHTMLFile({
      head,
      value,
      name: "index",
    });
  }, [value, head]);

  const insertHTMLHead = useCallback((customHeadString: string) => {
    setHead(htmlHeadInit + customHeadString + htmlHeadEnd);
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
      downloadFile,
      insertHTMLHead,
      head,
    }),
    [
      open,
      closeEditor,
      openEditor,
      value,
      handleUserInput,
      lastUpdate,
      downloadFile,
      insertHTMLHead,
      head,
    ]
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
