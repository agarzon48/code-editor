import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { javascript } from "@codemirror/lang-javascript";

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
};

const JSContext = createContext(defaultContext);

export const JSContextProvider = ({ children }: ContextType) => {
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
      value,
      open,
      closeEditor,
      openEditor,
      handleUserInput,
      lastUpdate,
    }),
    [value, open, closeEditor, openEditor, handleUserInput, lastUpdate]
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
