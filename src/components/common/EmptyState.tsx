import { Button } from '../ui/Button';
import { Icon, type IconName } from '../ui/Icon';
import { cn } from '../../utils/cn';
import styles from './EmptyState.module.scss';

// Универсальный центрированный блок-заглушка: пустая корзина, ошибка загрузки
// и страница успеха. variant='success' даёт зелёный маркер и галочку.
interface EmptyStateProps {
  title: string;
  description?: string;
  variant?: 'success' | 'neutral';
  icon?: IconName;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function EmptyState({
  title,
  description,
  variant = 'neutral',
  icon,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) {
  const iconName = icon ?? (variant === 'success' ? 'check' : 'cart');

  return (
    <div className={styles.empty}>
      <div className={cn(styles.marker, styles[variant])}>
        <Icon name={iconName} size={40} />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {buttonLabel && onButtonClick && (
        <Button variant="primary" size="m" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
