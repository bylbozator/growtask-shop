import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types/product';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Загружает товары с API один раз при монтировании и отдаёт состояния
// loading / error, чтобы страница могла показать скелетон или ошибку.
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Флаг active защищает от обновления состояния после размонтирования
    // (например, при быстром переходе между страницами).
    let active = true;

    (async () => {
      try {
        const data = await fetchProducts();
        if (active) setProducts(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
