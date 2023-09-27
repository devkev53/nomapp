import { useContext } from "react";
import { StoreContext } from "../context/storeContext";
import { initialState } from "../context/storeContext";

export const useStoreContext = () => {
  const { state, setState } = useContext(StoreContext);

  const addToShop = (payload) => {
    setState({
      ...state,
      cart: [...setState.cart, payload],
    });
  };

  const resetShop = () => {
    setState(initialState);
  };

  return {
    state,
    addToShop,
    resetShop,
  };
};
