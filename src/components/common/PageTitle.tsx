import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './PageTitle.module.scss';

// Заголовок страницы (h1) с опциональным блоком справа (aside),
// например бейджем с количеством товаров в корзине.
interface PageTitleProps {
  title: string;
  aside?: ReactNode;
  className?: string;
}

export function PageTitle({ title, aside, className }: PageTitleProps) {
  return (
    <div className={cn(styles.title, className)}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{title}</h1>
        {aside}
      </div>
    </div>
  );
}
