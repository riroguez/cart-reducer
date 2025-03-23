import { Dispatch } from 'react';
import { CartItem } from '../types';
import { CartActions } from '../reducers/cart-reducer';

const formatCartForWhatsApp = (cart: CartItem[]) => {
  if (cart.length === 0) return 'Your cart is empty';

  let message = '🛒 *New purchase order*\n\n';
  const origin = window.location.origin;

  cart.forEach((item, index) => {
    message += `${index + 1}. Producto: *${item.name}* \n`;
    message += `  - Precio: $${item.price}\n`;
    message += `  - Cantidad: ${item.quantity}\n`;
    message += `  - Imagen: ${origin}/img/${item.image}.jpg\n\n`;
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  message += `💰 *total: $${totalPrice.toFixed(2)}*`;
  return encodeURIComponent(message);
};

const payWhatsApp = (cart: CartItem[]) => {
  if (cart.length === 0) {
    alert('You cart is empty');
    return;
  }
  const phoneNumber = '593981237323';
  const message = formatCartForWhatsApp(cart);
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  window.open(whatsAppUrl, '_blank');
};

export const handlePurchase = (
  cart: CartItem[],
  dispatch: Dispatch<CartActions>
) => {
  if (cart.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  // 1. Enviar el mensaje por WhatsApp
  payWhatsApp(cart);

  // 2. Limpiar el carrito
  dispatch({ type: 'make-purchase' });

  // 3. (Opcional) Mostrar feedback
  alert('¡Tu pedido ha sido enviado por WhatsApp!');
};
