import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from '../../utils/cn';
import styles from './Button.module.scss';

// Универсальная кнопка: три варианта (primary/secondary/gray),
// три размера и опциональные иконки слева/справа или иконка-только (iconOnly).
export type ButtonVariant = 'primary' | 'secondary' | 'gray';
export type ButtonSize = 'xs' | 's' | 'm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconOnly?: IconName;
  iconSize?: number;
  full?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'm',
  iconLeft,
  iconRight,
  iconOnly,
  iconSize,
  full,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const glyphSize = iconSize ?? (size === 'm' ? 24 : 20);

  return (
    <button
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        full && styles.full,
        iconOnly && styles.iconOnly,
        className,
      )}
      {...rest}
    >
      {iconOnly ? (
        <Icon name={iconOnly} size={glyphSize} />
      ) : (
        <>
          {iconLeft && <Icon name={iconLeft} size={glyphSize} />}
          {children != null && <span className={styles.label}>{children}</span>}
          {iconRight && <Icon name={iconRight} size={glyphSize} />}
        </>
      )}
    </button>
  );
}
