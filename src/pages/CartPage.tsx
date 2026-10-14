import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageTitle } from '../components/common/PageTitle';
import { EmptyState } from '../components/common/EmptyState';
import { CartToolbar } from '../components/cart/CartToolbar';
import { CartItem } from '../components/cart/CartItem';
import { OrderSummary } from '../components/cart/OrderSummary';
import { PromoCode } from '../components/cart/PromoCode';
import { Badge } from '../components/ui/Badge';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../store/useCart';
import styles from './CartPage.module.scss';

// Страница корзины. Отвечает за загрузку товаров, состояния
// (загрузка / ошибка / пусто) и раскладку «список товаров + чек».
export function CartPage() {
  const navigate = useNavigate();
  const { lines, itemsCount, seed } = useCart();
  const { products, loading, error } = useProducts();

  // Наполняем корзину товарами из API, когда данные пришли.
  // Если в корзине уже что-то есть (в т.ч. из localStorage) — не трогаем.
  useEffect(() => {
    if (!loading && !error) {
      seed(products);
    }
  }, [loading, error, products, seed]);

  const goToCheckout = () => navigate('/checkout');

  return (
    <div className={styles.page}>
      <Header title="Корзина" />
      <Breadcrumbs items={[{ label: 'Корзина' }]} />

      <PageTitle title="Корзина" aside={<Badge>{itemsCount} шт.</Badge>} />

      <main className={styles.main}>
        <div className={styles.container}>
          {loading && (
            <div className={styles.skeletonList}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.skeleton} />
              ))}
            </div>
          )}

          {!loading && error && (
            <EmptyState
              title="Не удалось загрузить корзину"
              description={error}
              icon="info"
            />
          )}

          {!loading && !error && lines.length === 0 && (
            <EmptyState
              title="В корзине пока нет товаров"
              description="Добавьте товары, чтобы оформить заказ"
              icon="cart"
            />
          )}

          {!loading && !error && lines.length > 0 && (
            <div className={styles.layout}>
              <div className={styles.cards}>
                <CartToolbar />
                <div className={styles.list}>
                  {lines.map((line, index) => (
                    <Fragment key={line.product.id}>
                      <CartItem line={line} />
                      {index < lines.length - 1 && <div className={styles.divider} />}
                    </Fragment>
                  ))}
                </div>
              </div>

              <aside className={styles.checkout}>
                <OrderSummary onButtonClick={goToCheckout} />
                <PromoCode />
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
