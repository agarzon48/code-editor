import ReactDOM from "react-dom/client";

import { EditorsContextProvider } from "./contexts/EditorsContext";
import App from "./components/App";

import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <EditorsContextProvider>
    <App />
  </EditorsContextProvider>
);
