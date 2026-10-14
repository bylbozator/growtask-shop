import type { PaymentMethod } from '../../store/cart-context';
import type { IconName } from '../ui/Icon';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';
import { StepCard } from './StepCard';
import styles from './CheckoutPaymentStep.module.scss';

// Третий шаг: выбор способа оплаты. Один из вариантов активен (радио-кнопка).
interface PaymentOption {
  value: PaymentMethod;
  icon: IconName;
  title: string;
  description: string;
}

const options: PaymentOption[] = [
  {
    value: 'online',
    icon: 'card',
    title: 'Онлайн',
    description: 'Visa, Mastercard, Мир, SberPay',
  },
  {
    value: 'cash',
    icon: 'wallet',
    title: 'При получении',
    description: 'Наличными или картой при получении',
  },
];

interface CheckoutPaymentStepProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export function CheckoutPaymentStep({ value, onChange }: CheckoutPaymentStepProps) {
  return (
    <StepCard
      title="Cпособ оплаты"
      description="Выберите удобный способ оплаты заказа"
    >
      <div className={styles.method}>
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={cn(styles.tab, active && styles.active)}
              onClick={() => onChange(option.value)}
              aria-pressed={active}
            >
              <span className={styles.icon}>
                <Icon name={option.icon} size={22} />
              </span>
              <span className={styles.text}>
                <span className={styles.title}>{option.title}</span>
                <span className={styles.description}>{option.description}</span>
              </span>
              <span className={cn(styles.radio, active && styles.radioActive)}>
                {active && <span className={styles.dot} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.info}>
        <div className={styles.line} />
        <div className={styles.infoRow}>
          <Icon name="info" size={22} />
          <span>При оформлении заказа вы будете перенаправлены на страницу платёжной системы</span>
        </div>
      </div>
    </StepCard>
  );
}
