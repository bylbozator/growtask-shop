import { useCart } from '../../store/useCart';
import type { CartLine } from '../../store/cart-context';
import { formatPrice } from '../../utils/format';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Stepper } from '../ui/Stepper';
import styles from './CartItem.module.scss';

// Строка товара в корзине.
// Desktop/планшет — горизонтальная карточка; мобила — вертикальная.
// Содержит чек-бокс выбора, изображение, артикул/название, цену со скидкой,
// счётчик количества и кнопку удаления.
interface CartItemProps {
  line: CartLine;
}

export function CartItem({ line }: CartItemProps) {
  const { increment, decrement, remove, toggleSelected, maxQuantity } = useCart();
  const { product, quantity, selected } = line;
  // Максимум для счётчика — доступное количество товара из API.
  const max = maxQuantity(product);

  return (
    <article className={styles.item}>
      <div className={styles.about}>
        <div className={styles.imageWrap}>
          <Checkbox
            className={styles.check}
            checked={selected}
            onChange={() => toggleSelected(product.id)}
            aria-label={`Выбрать ${product.name}`}
          />
          <div className={styles.imageBox}>
            <img className={styles.image} src={product.image} alt={product.name} loading="lazy" />
          </div>
        </div>

        <div className={styles.info}>
          <span className={styles.article}>Артикул: {product.sku}</span>
          <span className={styles.name}>{product.name}</span>
        </div>
      </div>

      <div className={styles.controlBlock}>
        <div className={styles.value}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.old_price != null && (
            <span className={styles.sale}>{formatPrice(product.old_price)}</span>
          )}
        </div>

        <div className={styles.control}>
          <div className={styles.quantity}>
            <Stepper
              value={quantity}
              min={1}
              max={max}
              size="s"
              onDecrement={() => decrement(product.id)}
              onIncrement={() => increment(product.id)}
            />
            <span className={styles.amount}>{formatPrice(product.price * quantity)}</span>
          </div>

          <Button
            variant="secondary"
            size="s"
            iconOnly="trash"
            onClick={() => remove(product.id)}
            aria-label={`Удалить ${product.name}`}
          />
        </div>
      </div>
    </article>
  );
}
