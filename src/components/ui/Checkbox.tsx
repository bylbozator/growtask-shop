import type { InputHTMLAttributes } from 'react';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import styles from './Checkbox.module.scss';

// Чек-бокс на нативном input (доступность из коробки),
// стилизованный через соседний span. Используется для выбора товаров.
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cn(styles.wrapper, className)}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span className={styles.box}>
        <Icon name="check" size={16} strokeWidth={2.6} className={styles.check} />
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
}
