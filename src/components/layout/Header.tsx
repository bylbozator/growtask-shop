import { Link } from 'react-router-dom';
import { useCart } from '../../store/useCart';
import { formatPrice } from '../../utils/format';
import { Icon } from '../ui/Icon';
import styles from './Header.module.scss';

// Шапка. На desktop: логотип студии и кнопка-корзина со счётчиком и суммой.
// На планшете/мобиле кнопка-корзина скрыта, а вместо неё показывается
// заголовок текущей страницы (prop title).
interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { itemsCount, total } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.container}>
          <Link to="/cart" className={styles.madeIn} aria-label="Growtask">
            <span className={styles.flag} />
            <span className={styles.madeText}>
              <span className={styles.madeLabel}>Сайт сделан в студии</span>
              <span className={styles.logo}>growtask</span>
            </span>
          </Link>

          <div className={styles.actions}>
            <Link to="/cart" className={styles.cartButton} aria-label="Перейти в корзину">
              {itemsCount > 0 && <span className={styles.cartBadge}>{itemsCount}</span>}
              <span className={styles.cartBody}>
                <Icon name="cart" size={22} />
                <span className={styles.cartTotal}>{formatPrice(total)}</span>
              </span>
            </Link>
          </div>

          <span className={styles.mobileTitle}>{title}</span>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.lineInner} />
      </div>
    </header>
  );
}
