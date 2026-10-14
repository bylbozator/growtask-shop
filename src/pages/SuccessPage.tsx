import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { ORDER_STORAGE_KEY } from '../store/cart-context';
import styles from './SuccessPage.module.scss';

// Страница успеха. Номер заказа берём из state перехода,
// а при перезагрузке — из localStorage.
interface LocationState {
  number?: string;
}

const readOrderNumber = (): string => {
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { number?: string };
      if (parsed.number) return parsed.number;
    }
  } catch {
    // игнорируем
  }
  return '001';
};

export function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const number = state?.number ?? readOrderNumber();

  return (
    <div className={styles.page}>
      <Header title="Заказ оформлен" />
      <Breadcrumbs
        items={[
          { label: 'Корзина', to: '/cart' },
          { label: 'Оформление заказа', to: '/checkout' },
          { label: 'Заказ' },
        ]}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <EmptyState
            variant="success"
            title={`Заказ №${number} успешно создан`}
            description="Статус заказа вы можете отслеживать в личном кабинете. Спасибо за покупку!"
            buttonLabel="В корзину"
            onButtonClick={() => navigate('/cart')}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
