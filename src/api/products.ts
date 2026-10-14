import type { Product, ProductsResponse } from '../types/product';
import { fallbackProducts } from './products.fallback';

// Путь к API. В dev-режиме обращаемся к нему через прокси Vite (см.
// vite.config.ts) — запрос уходит с сервера разработки и не упирается в CORS.
// В production-сборке идём напрямую на домен API.
const API_PATH = '/test-front/api/products';
const API_URL = import.meta.env.DEV ? API_PATH : `https://growtask.ru${API_PATH}`;

// Картинки приходят по http — на https-хостинге это mixed content,
// поэтому принудительно переводим на https.
const normalizeImage = (url: string): string => url.replace(/^http:\/\//, 'https://');

const normalize = (products: Product[]): Product[] =>
  products.map((product) => ({ ...product, image: normalizeImage(product.image) }));

export async function fetchProducts(page = 1): Promise<Product[]> {
  try {
    const url = new URL(API_URL, window.location.origin);
    url.searchParams.set('page', String(page));

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить товары (${response.status})`);
    }

    const json = (await response.json()) as ProductsResponse;
    if (!Array.isArray(json.data) || json.data.length === 0) {
      throw new Error('API вернул пустой список товаров');
    }

    return normalize(json.data);
  } catch (error) {
    // У API growtask нет CORS-заголовков: прямой запрос из браузера с чужого
    // origin блокируется. Чтобы каталог отображался всегда, используем
    // сохранённый снимок ответа API.
    console.warn('Не удалось получить товары с API, использую локальный снимок:', error);
    return normalize(fallbackProducts);
  }
}
