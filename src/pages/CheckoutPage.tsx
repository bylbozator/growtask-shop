import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PageTitle } from '../components/common/PageTitle';
import { EmptyState } from '../components/common/EmptyState';
import { OrderSummary } from '../components/cart/OrderSummary';
import { PromoCode } from '../components/cart/PromoCode';
import { CheckoutCartStep } from '../components/checkout/CheckoutCartStep';
import { CheckoutUserStep } from '../components/checkout/CheckoutUserStep';
import { CheckoutPaymentStep } from '../components/checkout/CheckoutPaymentStep';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import {
  ORDER_STORAGE_KEY,
  type OrderCustomer,
  type OrderPayload,
  type PaymentMethod,
} from '../store/cart-context';
import { useCart } from '../store/useCart';
import { generateOrderNumber } from '../utils/format';
import styles from './CheckoutPage.module.scss';

type FormErrors = Partial<Record<keyof OrderCustomer, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Валидация формы: обязательные имя и фамилия, телефон из 11 цифр, корректный e-mail.
const validate = (values: OrderCustomer): FormErrors => {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) errors.firstName = 'Укажите имя';
  if (!values.lastName.trim()) errors.lastName = 'Укажите фамилию';

  if (!values.phone.trim()) {
    errors.phone = 'Укажите телефон';
  } else if (values.phone.replace(/\D/g, '').length !== 11) {
    errors.phone = 'Введите номер полностью';
  }

  if (!values.email.trim()) {
    errors.email = 'Укажите почту';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Неверный адрес почты';
  }

  return errors;
};

// Страница оформления заказа.
// Хранит данные покупателя и способ оплаты, валидирует форму,
// формирует объект заказа, пишет его в консоль (F12) и localStorage,
// очищает корзину и уводит на страницу успеха.
export function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, promoCode, subtotal, discount, total, clear, clearPromo } = useCart();

  // Контролируемое состояние формы покупателя.
  const [customer, setCustomer] = useState<OrderCustomer>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>('online');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof OrderCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = () => {
    const nextErrors = validate(customer);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: OrderPayload = {
      number: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer,
      payment,
      promo: promoCode,
      items: lines.map((line) => ({
        id: line.product.id,
        sku: line.product.sku,
        name: line.product.name,
        price: line.product.price,
        quantity: line.quantity,
        total: line.product.price * line.quantity,
      })),
      subtotal,
      discount,
      total,
    };

    // ТЗ: массив данных оформления выводим в консоль (F12)
    console.log('Данные оформления заказа:', payload);
    console.log('Товары заказа:', payload.items);

    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage может быть недоступен — игнорируем
    }

    clear();
    clearPromo();
    navigate('/success', { state: { number: payload.number } });
  };

  if (lines.length === 0) {
    return (
      <div className={styles.page}>
        <Header title="Оформление заказа" />
        <Breadcrumbs items={[{ label: 'Корзина', to: '/cart' }, { label: 'Оформление' }]} />
        <PageTitle title="Оформление заказа" />
        <main className={styles.main}>
          <div className={styles.container}>
            <EmptyState
              title="Корзина пуста"
              description="Добавьте товары, чтобы оформить заказ"
              icon="cart"
              buttonLabel="В корзину"
              onButtonClick={() => navigate('/cart')}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header title="Оформление заказа" />
      <Breadcrumbs items={[{ label: 'Корзина', to: '/cart' }, { label: 'Оформление' }]} />

      <PageTitle title="Оформление заказа" />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.left}>
              <div className={styles.steps}>
                <CheckoutCartStep />
                <CheckoutUserStep values={customer} errors={errors} onChange={handleChange} />
                <CheckoutPaymentStep value={payment} onChange={setPayment} />
              </div>

              <div className={styles.bottomButton}>
                <Button variant="primary" size="m" onClick={handleSubmit}>
                  Оформить заказ
                </Button>
                <p className={styles.bottomHint}>
                  <Icon name="info" size={22} />
                  <span>Вы указали все необходимые данные, теперь можно оформить заказ</span>
                </p>
              </div>
            </div>

            <aside className={styles.checkout}>
              <OrderSummary
                title="Ваш заказ:"
                buttonLabel="Оформить заказ"
                onButtonClick={handleSubmit}
              />
              <PromoCode />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
