import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './StepCard.module.scss';

// Общая «карточка шага» оформления: белая подложка, тень, заголовок
// и описание. Внутрь кладётся содержимое конкретного шага.
interface StepCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function StepCard({ title, description, children, className }: StepCardProps) {
  return (
    <section className={cn(styles.card, className)}>
      {(title || description) && (
        <div className={styles.head}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
