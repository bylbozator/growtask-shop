# Growtask Shop - корзина и оформление заказа

Тестовое задание: вёрстка страниц **корзины** и **оформления заказа** по макету Figma и реализация рабочего функционала.

Реализованы три страницы:

- `/cart` - корзина: редактирование количества, удаление, выбор товаров, промокод, пересчёт сумм.
- `/checkout` - оформление: данные покупателя, способ оплаты, сводка заказа.
- `/success` - подтверждение: «Заказ №XXX успешно создан».

## Стек

- **React 18** + **TypeScript**
- **Vite 5**
- **React Router 6**
- **SCSS** + CSS-модули
- Стор - React Context + `useReducer`-подобная логика на хуках, с сохранением в `localStorage`

## Требования

- Node.js ≥ 18 (проверено на v22.14.0)
- npm ≥ 9 (проверено на v11.6.3)

## Установка и запуск

```bash
npm install      # установка зависимостей
npm run dev      # dev-сервер (http://localhost:5173)
npm run build    # production-сборка в ./dist
npm run preview  # предпросмотр production-сборки
npm run typecheck# проверка типов (tsc --noEmit)
npm run lint     # eslint
```

## Структура проекта

```
src/
├─ api/products.ts            # загрузка товаров с API (+ нормализация http→https, fallback)
├─ api/products.fallback.ts   # снимок ответа API (если запрос из браузера недоступен)
├─ components/
│  ├─ ui/                     # UI-кит: Icon, Button, Checkbox, Stepper, Badge, Field
│  ├─ layout/                 # Header, Breadcrumbs, Footer
│  ├─ common/                 # PageTitle, EmptyState
│  ├─ cart/                   # CartToolbar, CartItem, OrderSummary, PromoCode
│  └─ checkout/               # StepCard, CheckoutCartStep, CheckoutUserStep, CheckoutPaymentStep
├─ hooks/useProducts.ts       # загрузка товаров (loading / error)
├─ pages/                     # CartPage, CheckoutPage, SuccessPage
├─ store/                     # cart-context, CartProvider, useCart
├─ styles/                    # _variables.scss (токены), _mixins.scss, globals.scss
├─ types/product.ts
├─ utils/                     # format, cn
├─ App.tsx                    # маршруты
└─ main.tsx                   # точка входа
```

## Источник данных

`GET https://growtask.ru/test-front/api/products` (8 товаров).

Поля: `id, name, price, old_price, image, sku, quantity`.

Картинки приходят по `http` - принудительно переводятся на `https`, чтобы не ломать mixed content на https-хостинге.

**Про CORS.** У этого API нет заголовков `Access-Control-Allow-*`, поэтому прямой
запрос из браузера с чужого origin (`localhost`, `github.io`) блокируется.
Решение:

- в **dev** запрос идёт через прокси Vite (`/test-front` → `https://growtask.ru`),
  то есть с сервера разработки - CORS не мешает;
- в **production** запрос идёт напрямую; если он заблокирован, `fetchProducts`
  использует сохранённый снимок ответа из `api/products.fallback.ts`,
  чтобы каталог всё равно отобразился.

## Логика корзины

- При первом открытии корзина наполняется всеми товарами из API (по 1 шт.).
- Количество меняется в пределах `1 … product.quantity` (для товаров с `quantity: 0` максимум = 1).
- Суммы:
  - `subtotal` = Σ `(old_price ?? price) × qty`
  - `скидка` = Σ `(old_price − price) × qty` + промо-скидка
  - `Итого` = Σ `price × qty` − промо-скидка
- Состав корзины сохраняется в `localStorage` (ключ `growtask:cart`).

## Промокод

`GROWTASK2026` → скидка **10%**.

## Оформление заказа

- Валидация: имя и фамилия обязательны, телефон - 11 цифр, e-mail - по формату.
- Способ оплаты: «Онлайн» / «При получении».
- При отправке формируется объект заказа, который выводится в консоль браузера (F12):
  - `console.log('Данные оформления заказа:', payload)`
  - `console.log('Товары заказа:', payload.items)` - массив товаров
- Заказ сохраняется в `localStorage` (ключ `growtask:order`), корзина очищается, происходит переход на `/success`.

## Адаптив

Дизайн задан в 4 разрешениях: **1920 / 1366 / 768 / 414**.

- **desktop ≥ 1024px** - контейнер `min(1420px, 100% − 90px)`: 1420px на 1920 и плавное сжатие к 1276px на 1366.
- **tablet 768-1023px** - контейнер full-width с отступом 16px, корзина и оформление в одну колонку.
- **mobile ≤ 767px** - дополнительно карточка товара вертикальная, формы в один столбец.

## Шрифты

В макете заголовки набраны фирменным платным шрифтом `Vladivostok`. В проекте он объявлен через `@font-face` и ожидается по пути `public/fonts/Vladivostok-Bold.woff2`. Сам файл шрифта в поставку не входит, поэтому по умолчанию заголовки рендерятся фолбэком `Inter` (подключён через Google Fonts). Для точного совпадения с макетом достаточно добавить `Vladivostok-Bold.woff2` в `public/fonts/`.

## Реализованные бонусы

- Промокод.
- Мультивыбор товаров чекбоксами + «Выбрать все» / «Очистить корзину».
- Комментарий к заказу.
- Заглушки состояний загрузки и пустой корзины.
