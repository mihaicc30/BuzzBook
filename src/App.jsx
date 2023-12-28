import { createContext, useEffect, useState } from "react";
import Paths from "./comp/Paths";

export const AppContext = createContext();

export default function App() {
  const [contextValues, setContextValues] = useState({});

  const updateContext = (newValues) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  return (
    <AppContext.Provider value={{ ...contextValues, updateContext }}>
      <Paths />
    </AppContext.Provider>
  );
}
