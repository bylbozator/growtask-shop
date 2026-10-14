import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';
import styles from './Breadcrumbs.module.scss';

// Хлебные крошки. Первым всегда идёт иконка-домик, далее элементы списка.
// Последний элемент — текущая страница (не ссылка). На планшете/мобиле скрыты.
export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <div className={styles.container}>
        <Link to="/cart" className={styles.home} aria-label="На главную">
          <Icon name="home" size={16} />
        </Link>

        <ul className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className={styles.item}>
                <span className={styles.separator}>/</span>
                {isLast || !item.to ? (
                  <span className={cn(styles.link, styles.active)}>{item.label}</span>
                ) : (
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
