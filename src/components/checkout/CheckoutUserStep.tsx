import type { OrderCustomer } from '../../store/cart-context';
import { formatPhone } from '../../utils/format';
import { Input, Textarea } from '../ui/Field';
import { Icon } from '../ui/Icon';
import { StepCard } from './StepCard';
import styles from './CheckoutUserStep.module.scss';

// Второй шаг: данные покупателя. Компонент контролируемый —
// значения и ошибки приходят из CheckoutPage, туда же уходят изменения.
// Телефон форматируется маской +7 (999) 123-45-67.
interface CheckoutUserStepProps {
  values: OrderCustomer;
  errors: Partial<Record<keyof OrderCustomer, string>>;
  onChange: (field: keyof OrderCustomer, value: string) => void;
}

export function CheckoutUserStep({ values, errors, onChange }: CheckoutUserStepProps) {
  return (
    <StepCard
      title="Покупатель"
      description="Укажите свои данные для покупки наших товаров"
    >
      <div className={styles.row}>
        <Input
          name="firstName"
          label="Имя*"
          placeholder="Иван"
          value={values.firstName}
          error={errors.firstName}
          onClear={() => onChange('firstName', '')}
          onChange={(event) => onChange('firstName', event.target.value)}
        />
        <Input
          name="lastName"
          label="Фамилия*"
          placeholder="Иванов"
          value={values.lastName}
          error={errors.lastName}
          onClear={() => onChange('lastName', '')}
          onChange={(event) => onChange('lastName', event.target.value)}
        />
      </div>

      <div className={styles.row}>
        <Input
          name="phone"
          label="Телефон"
          placeholder="+7 800 555 35 35"
          iconLeft="phone"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          onClear={() => onChange('phone', '')}
          onChange={(event) => onChange('phone', formatPhone(event.target.value))}
        />
        <Input
          name="email"
          type="email"
          label="Почта"
          placeholder="mail@example.com"
          iconLeft="mail"
          value={values.email}
          error={errors.email}
          onClear={() => onChange('email', '')}
          onChange={(event) => onChange('email', event.target.value)}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.line} />
        <div className={styles.infoRow}>
          <Icon name="info" size={22} />
          <span>Внимательно проверьте контактные данные, они нужны для получения заказа</span>
        </div>
        <div className={styles.line} />
      </div>

      <Textarea
        name="comment"
        label="Комментарий к заказу"
        placeholder="Напишите свои пожелания..."
        value={values.comment}
        onChange={(event) => onChange('comment', event.target.value)}
      />
    </StepCard>
  );
}
