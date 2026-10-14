import { useContext } from 'react';
import { CartContext, type CartContextValue } from './cart-context';

// Хук доступа к состоянию корзины.
// Бросает ошибку, если вызван вне <CartProvider>, — это ловит ошибки интеграции сразу.
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри <CartProvider>');
  }
  return context;
}
