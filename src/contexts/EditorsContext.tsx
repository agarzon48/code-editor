import { createContext, useContext, ReactNode } from "react";

import { JSContextProvider } from "./JSContext";
import { HTMLContextProvider } from "./HTMLContext";
import { CSSContextProvider } from "./CSSContext";

const EditorsContext = createContext(null);

export const EditorsContextProvider = ({ children }: ContextType) => {
  return (
    <EditorsContext.Provider value={null}>
      <JSContextProvider>
        <HTMLContextProvider>
          <CSSContextProvider>{children}</CSSContextProvider>
        </HTMLContextProvider>
      </JSContextProvider>
    </EditorsContext.Provider>
  );
};

const useEditorsContext = () => useContext(EditorsContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useEditorsContext;

type ContextType = {
  children: ReactNode;
};
