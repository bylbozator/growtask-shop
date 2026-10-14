// Форматирование цены в вид «1 999 999 ₽»
export const formatPrice = (value: number): string =>
  `${new Intl.NumberFormat('ru-RU').format(Math.round(value))} ₽`;

// Русское склонение: pluralize(3, ['товар', 'товара', 'товаров']) → 'товара'
export const pluralize = (count: number, forms: [string, string, string]): string => {
  const abs = Math.abs(count) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
};

export const formatItemsCount = (count: number): string =>
  `${new Intl.NumberFormat('ru-RU').format(count)} ${pluralize(count, [
    'товар',
    'товара',
    'товаров',
  ])}`;

// Телефон: +7 (999) 123-45-67
export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').replace(/^7?/, '7').slice(0, 11);
  if (!digits) return '';
  const rest = digits.slice(1);
  let result = '+7';
  if (rest.length) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += ')';
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
};

// Генерация номера заказа вида 001, 002, ...
export const generateOrderNumber = (): string =>
  String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
