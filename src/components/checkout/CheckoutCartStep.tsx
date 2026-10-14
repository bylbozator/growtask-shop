import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/useCart';
import { formatItemsCount } from '../../utils/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StepCard } from './StepCard';
import styles from './CheckoutCartStep.module.scss';

// Первый шаг оформления: сводка состава корзины (миниатюры + количество)
// и кнопка возврата в корзину для правок.
export function CheckoutCartStep() {
  const navigate = useNavigate();
  const { lines, itemsCount } = useCart();

  return (
    <StepCard title={formatItemsCount(itemsCount)}>
      <div className={styles.products}>
        {lines.map((line) => (
          <div key={line.product.id} className={styles.product}>
            <img
              className={styles.image}
              src={line.product.image}
              alt={line.product.name}
              loading="lazy"
            />
            <Badge variant="dark" size="xs" className={styles.badge}>
              {line.quantity}
            </Badge>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="s"
        iconLeft="arrow-left"
        onClick={() => navigate('/cart')}
        className={styles.back}
      >
        Вернуться в корзину
      </Button>
    </StepCard>
  );
}
