import { createContext } from 'react';
import type { Product } from '../types/product';

// Типы и контекст корзины. Вынесены отдельно от провайдера,
// чтобы хуки/компоненты не тянули реализацию.

// Позиция корзины: товар + количество + признак выбора (чек-бокс).
export interface CartLine {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  comment: string;
}

export type PaymentMethod = 'online' | 'cash';

// Заказ, который формируется при оформлении и уходит в консоль/localStorage.
export interface OrderPayload {
  number: string;
  createdAt: string;
  customer: OrderCustomer;
  payment: PaymentMethod;
  promo: string | null;
  items: Array<{
    id: number;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
}

// Публичный интерфейс корзины: данные + методы изменения.
export interface CartContextValue {
  lines: CartLine[];
  itemsCount: number;
  linesCount: number;
  selectedCount: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string | null;
  promoApplied: boolean;
  promoError: string | null;
  allSelected: boolean;
  maxQuantity: (product: Product) => number;
  setLines: (lines: CartLine[]) => void;
  seed: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setQuantity: (id: number, quantity: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  removeSelected: () => void;
  clear: () => void;
  toggleSelected: (id: number) => void;
  toggleSelectAll: () => void;
  applyPromo: (code: string) => void;
  clearPromo: () => void;
}

export const PROMO_CODE = 'GROWTASK2026';
export const PROMO_RATE = 0.1;
export const CART_STORAGE_KEY = 'growtask:cart';
export const ORDER_STORAGE_KEY = 'growtask:order';

export const CartContext = createContext<CartContextValue | null>(null);
