import React from "react";
import useGlobalState from "../hooks/useGlobalState";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const initialState = useGlobalState();
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};
