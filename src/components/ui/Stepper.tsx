import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import styles from './Stepper.module.scss';

// Счётчик количества «− число +». Кнопки блокируются на границах min/max,
// которые задаёт карточка товара (max — доступное количество из API).
export type StepperSize = 's' | 'xs';

interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  size?: StepperSize;
  onDecrement: () => void;
  onIncrement: () => void;
  className?: string;
}

export function Stepper({
  value,
  min = 1,
  max = 99,
  size = 's',
  onDecrement,
  onIncrement,
  className,
}: StepperProps) {
  return (
    <div className={cn(styles.stepper, styles[size], className)}>
      <button
        type="button"
        className={styles.control}
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Уменьшить количество"
      >
        <Icon name="minus" size={size === 's' ? 16 : 14} />
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.control}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Увеличить количество"
      >
        <Icon name="plus" size={size === 's' ? 16 : 14} />
      </button>
    </div>
  );
}
