import { useCart } from '../../store/useCart';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import styles from './CartToolbar.module.scss';

// Панель над списком товаров: выбор всех и удаление.
// Бонус ТЗ — множественный выбор через чек-боксы: если отмечена часть
// товаров, кнопка удаляет именно их; если ничего не отмечено — очищает всю корзину.
export function CartToolbar() {
  const { allSelected, linesCount, selectedCount, toggleSelectAll, removeSelected, clear } =
    useCart();

  const isPartialSelection = selectedCount > 0 && selectedCount < linesCount;

  const handleDelete = () => {
    if (isPartialSelection) {
      removeSelected();
    } else {
      clear();
    }
  };

  return (
    <div className={styles.toolbar}>
      <Checkbox
        className={styles.selectAll}
        label="Выбрать все"
        checked={allSelected}
        onChange={toggleSelectAll}
      />
      <Button
        variant="secondary"
        size="s"
        iconLeft="trash"
        onClick={handleDelete}
        disabled={linesCount === 0}
      >
        {isPartialSelection ? `Удалить выбранные (${selectedCount})` : 'Очистить корзину'}
      </Button>
    </div>
  );
}
