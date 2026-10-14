import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from '../../utils/cn';
import styles from './Field.module.scss';

// Поля формы: Input и Textarea с общей обёрткой — подпись, иконка слева,
// кнопка очистки и текст ошибки. Используются на шаге «Покупатель».
interface CommonProps {
  label?: string;
  iconLeft?: IconName;
  error?: string;
}

interface InputProps
  extends CommonProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onClear?: () => void;
}

export function Input({
  label,
  iconLeft,
  error,
  onClear,
  id,
  className,
  value,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;
  const showClear = Boolean(onClear) && Boolean(value);

  return (
    <div className={cn(styles.field, error && styles.invalid, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={styles.control}>
        {iconLeft && (
          <span className={styles.icon}>
            <Icon name={iconLeft} size={20} />
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          value={value}
          {...rest}
        />
        {showClear && (
          <button type="button" className={styles.clear} onClick={onClear} aria-label="Очистить">
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

interface TextareaProps
  extends CommonProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ label, error, id, className, ...rest }: TextareaProps) {
  const inputId = id ?? rest.name;

  return (
    <div className={cn(styles.field, error && styles.invalid, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={cn(styles.control, styles.textareaControl)}>
        <textarea id={inputId} className={cn(styles.input, styles.textarea)} {...rest} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
