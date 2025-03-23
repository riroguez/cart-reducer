export type CartType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = CartType & {
  quantity: number;
};

export type CartState = {
  data: CartType[];
  cart: CartItem[];
};
