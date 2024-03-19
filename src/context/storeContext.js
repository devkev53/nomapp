import { useState, createContext } from "react";

export const initialState = {
  cart: [],
};
export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  );
};
