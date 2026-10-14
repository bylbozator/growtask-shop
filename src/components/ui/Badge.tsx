import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Badge.module.scss';

// Небольшой бейдж: счётчик товаров, процент скидки, количество в миниатюре.
export type BadgeVariant = 'secondary' | 'error' | 'dark';
export type BadgeSize = 's' | 'xs';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'secondary',
  size = 's',
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], styles[size], className)}>
      {children}
    </span>
  );
}
