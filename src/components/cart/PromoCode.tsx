import { useState } from 'react';
import { PROMO_CODE } from '../../store/cart-context';
import { useCart } from '../../store/useCart';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Input } from '../ui/Field';
import styles from './PromoCode.module.scss';

// Раскрывающийся блок промокода.
// При успехе показывает подтверждение с возможностью убрать промокод,
// иначе — поле ввода с текстом ошибки. Логика кода — в CartProvider.
export function PromoCode() {
  const { promoApplied, promoError, applyPromo, clearPromo } = useCart();
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('');

  const handleApply = () => {
    applyPromo(value);
  };

  return (
    <div className={styles.promo}>
      <button
        type="button"
        className={styles.head}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <Icon name="check" size={20} />
        <span className={styles.headText}>Промокод</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} />
      </button>

      {open && (
        <div className={styles.form}>
          {promoApplied ? (
            <div className={styles.applied}>
              <span>
                Промокод <strong>{PROMO_CODE}</strong> применён
              </span>
              <button
                type="button"
                className={styles.removePromo}
                onClick={clearPromo}
                aria-label="Убрать промокод"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          ) : (
            <>
              <Input
                label="Промокод"
                placeholder="Введите промокод"
                value={value}
                error={promoError ?? undefined}
                onClear={() => setValue('')}
                onChange={(event) => setValue(event.target.value.toUpperCase())}
              />
              <Button variant="gray" size="m" full onClick={handleApply}>
                Применить
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
