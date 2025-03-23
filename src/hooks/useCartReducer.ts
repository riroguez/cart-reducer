import { useEffect, useReducer } from 'react';
import { db } from '../data/db';
import { CartState } from '../types';
import { cartReducer } from '../reducers/cart-reducer';

// Estado inicial simple (vacio)
const initialState: CartState = {
  data: [],
  cart: [],
};

// Función de inicialización (Solo de ejecuta una vez)
const init = (): CartState => {
  const saveCart = localStorage.getItem('cart');
  return {
    data: db,
    cart: saveCart ? JSON.parse(saveCart) : [],
  };
};

// Custom hook
export const useCartReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState, init);

  // Guarda en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return { state, dispatch };
};
