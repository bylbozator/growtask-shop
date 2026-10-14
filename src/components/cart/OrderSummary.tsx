import { useCart } from '../../store/useCart';
import { formatItemsCount, formatPrice } from '../../utils/format';
import { Button } from '../ui/Button';
import type { IconName } from '../ui/Icon';
import styles from './OrderSummary.module.scss';

// Итоговый чек: количество, сумма, скидка (если есть) и «Итого».
// Переиспользуется и в корзине, и в оформлении — заголовок/кнопка настраиваются.
interface OrderSummaryProps {
  title?: string;
  buttonLabel?: string;
  buttonIcon?: IconName;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

export function OrderSummary({
  title = 'Ваша корзина:',
  buttonLabel = 'К оформлению',
  buttonIcon = 'arrow-right',
  buttonDisabled,
  onButtonClick,
}: OrderSummaryProps) {
  const { subtotal, discount, total, itemsCount } = useCart();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>{formatItemsCount(itemsCount)}:</span>
          <span className={styles.value}>{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <>
            <div className={styles.divider} />
            <div className={styles.row}>
              <span className={styles.label}>Скидка:</span>
              <span className={styles.discount}>{`− ${formatPrice(discount)}`}</span>
            </div>
          </>
        )}

        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={styles.totalLabel}>Итого:</span>
          <span className={styles.totalValue}>{formatPrice(total)}</span>
        </div>
        <div className={styles.divider} />
      </div>

      <Button
        variant="primary"
        size="m"
        full
        iconRight={buttonIcon}
        onClick={onButtonClick}
        disabled={buttonDisabled}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
