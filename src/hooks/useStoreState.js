import { useContext, useState } from "react";
import { StoreContext } from "../context/storeContext";
import { initialState } from "../context/storeContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const alertSwal = () => Swal.fire({
  title: 'Opps..!',
  icon: 'error',
  text:'Este elemnto ya fue se encuentra en el detalle'
}) 

export const useStoreContext = () => {
  const { state, setState } = useContext(StoreContext);

  const addToShop = (payload) => {
    payload.cant = 1
    payload.total = 1*payload.price
    if (!isDuplicate(payload)) {
      setState({
        ...state,
        cart: [
          ...state.cart,
          payload,
        ],
      });
    } else {
      alertSwal()
    }
  };

  const removeToShop = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter(
        items => items.id != payload.id
      )
    })
  }

  const updateCant = (payload, newCant) => {
    setState({
      ...state,
      cart: state.cart.map(item => {
        if (item === payload) {
          item.cant = parseInt(newCant)
          item.total = newCant * item.price
        }
        return item
      })
    })
  }

  const isDuplicate = (payload) => {
    return state.cart.includes(payload)
  }

  const resetShop = () => {
    setState(initialState);
  };

  return {
    state,
    addToShop,
    updateCant,
    removeToShop,
    state
  };
};
