import { db } from '../data/db';
import { CartItem, CartState, CartType } from '../types';

export type CartActions =
  | { type: 'add-to-cart'; payload: { item: CartType } }
  | { type: 'increase-quantity'; payload: { id: CartItem['id'] } }
  | { type: 'decrease-quantity'; payload: { id: CartItem['id'] } }
  | { type: 'destroy-item'; payload: { id: CartItem['id'] } }
  | { type: 'empty-cart' }
  | { type: 'make-purchase' };

// export type CartState = {
//   data: CartType[];
//   cart: CartItem[];
// };

export const initialState: CartState = {
  data: db,
  cart: [],
};

const MaxItem = 12;
const MinItem = 1;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === 'add-to-cart') {
    const itemExist = state.cart.find(
      cartItem => cartItem.id === action.payload.item.id
    );

    let upadateCart: CartItem[] = [];

    if (itemExist) {
      upadateCart = state.cart.map(cartItem =>
        cartItem.id === action.payload.item.id && cartItem.quantity < MaxItem
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      upadateCart = [...state.cart, { ...action.payload.item, quantity: 1 }];
    }

    return {
      ...state,
      cart: upadateCart,
    };
  }

  if (action.type === 'increase-quantity') {
    const upadateCart = state.cart.map(cartItem =>
      cartItem.id === action.payload.id && cartItem.quantity < MaxItem
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    return {
      ...state,
      cart: upadateCart,
    };
  }

  if (action.type === 'decrease-quantity') {
    const upadateCart = state.cart.map(cartItem =>
      cartItem.id === action.payload.id && cartItem.quantity > MinItem
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    return {
      ...state,
      cart: upadateCart,
    };
  }

  if (action.type === 'destroy-item') {
    const deleteItem = state.cart.filter(
      cartItem => cartItem.id !== action.payload.id
    );
    return {
      ...state,
      cart: deleteItem,
    };
  }

  if (action.type === 'empty-cart') {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === 'make-purchase') {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
