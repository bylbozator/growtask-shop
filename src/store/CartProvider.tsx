import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import {
  CART_STORAGE_KEY,
  CartContext,
  PROMO_CODE,
  PROMO_RATE,
  type CartContextValue,
  type CartLine,
} from './cart-context';

const maxQuantity = (product: Product): number =>
  product.quantity > 0 ? product.quantity : 1;

// Ограничивает число диапазоном [min, max].
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// Читает корзину из localStorage. Битые данные не должны ронять приложение,
// поэтому любые ошибки парсинга/чтения глотаем и возвращаем пустой массив.
const loadCart = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((line) => line && line.product && typeof line.product.id === 'number');
  } catch {
    return [];
  }
};

// Провайдер корзины: хранит строки, промокод и синхронизирует состав
// с localStorage. Все вычисления (суммы, скидки) мемоизированы.
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLinesState] = useState<CartLine[]>(loadCart);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage может быть недоступен — игнорируем
    }
  }, [lines]);

  const setLines = useCallback((next: CartLine[]) => setLinesState(next), []);

  const seed = useCallback((products: Product[]) => {
    setLinesState((current) => {
      if (current.length > 0) return current;
      return products.map((product) => ({
        product,
        quantity: 1,
        selected: true,
      }));
    });
  }, []);

  const addProduct = useCallback((product: Product) => {
    setLinesState((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? {
                ...line,
                quantity: clamp(line.quantity + 1, 1, maxQuantity(product)),
                selected: true,
              }
            : line,
        );
      }
      return [...current, { product, quantity: 1, selected: true }];
    });
  }, []);

  const setQuantity = useCallback((id: number, quantity: number) => {
    setLinesState((current) =>
      current.map((line) =>
        line.product.id === id
          ? { ...line, quantity: clamp(quantity, 1, maxQuantity(line.product)) }
          : line,
      ),
    );
  }, []);

  const increment = useCallback(
    (id: number) => {
      setLinesState((current) =>
        current.map((line) =>
          line.product.id === id
            ? { ...line, quantity: clamp(line.quantity + 1, 1, maxQuantity(line.product)) }
            : line,
        ),
      );
    },
    [],
  );

  const decrement = useCallback((id: number) => {
    setLinesState((current) =>
      current.map((line) =>
        line.product.id === id
          ? { ...line, quantity: clamp(line.quantity - 1, 1, maxQuantity(line.product)) }
          : line,
      ),
    );
  }, []);

  const remove = useCallback((id: number) => {
    setLinesState((current) => current.filter((line) => line.product.id !== id));
  }, []);

  // Удаление всех товаров, отмеченных чек-боксами (мультивыбор).
  const removeSelected = useCallback(() => {
    setLinesState((current) => current.filter((line) => !line.selected));
  }, []);

  const clear = useCallback(() => setLinesState([]), []);

  const toggleSelected = useCallback((id: number) => {
    setLinesState((current) =>
      current.map((line) =>
        line.product.id === id ? { ...line, selected: !line.selected } : line,
      ),
    );
  }, []);

  const allSelected = lines.length > 0 && lines.every((line) => line.selected);

  const toggleSelectAll = useCallback(() => {
    setLinesState((current) => {
      const nextSelected = !(current.length > 0 && current.every((line) => line.selected));
      return current.map((line) => ({ ...line, selected: nextSelected }));
    });
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === PROMO_CODE) {
      setPromoCode(PROMO_CODE);
      setPromoError(null);
    } else {
      setPromoCode(null);
      setPromoError('Промокод не найден');
    }
  }, []);

  const clearPromo = useCallback(() => {
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemsCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const selectedCount = lines.filter((line) => line.selected).length;

    const baseTotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const subtotal = lines.reduce(
      (sum, line) => sum + (line.product.old_price ?? line.product.price) * line.quantity,
      0,
    );
    const productDiscount = subtotal - baseTotal;
    const promoApplied = promoCode === PROMO_CODE;
    const promoDiscount = promoApplied ? Math.round(baseTotal * PROMO_RATE) : 0;

    return {
      lines,
      itemsCount,
      linesCount: lines.length,
      selectedCount,
      subtotal,
      discount: productDiscount + promoDiscount,
      total: baseTotal - promoDiscount,
      promoCode,
      promoApplied,
      promoError,
      allSelected,
      maxQuantity,
      setLines,
      seed,
      addProduct,
      setQuantity,
      increment,
      decrement,
      remove,
      removeSelected,
      clear,
      toggleSelected,
      toggleSelectAll,
      applyPromo,
      clearPromo,
    };
  }, [
    lines,
    promoCode,
    promoError,
    allSelected,
    setLines,
    seed,
    addProduct,
    setQuantity,
    increment,
    decrement,
    remove,
    removeSelected,
    clear,
    toggleSelected,
    toggleSelectAll,
    applyPromo,
    clearPromo,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
