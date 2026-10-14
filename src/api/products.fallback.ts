import type { Product } from '../types/product';

// Снимок ответа https://growtask.ru/test-front/api/products (8 товаров).
//
// Зачем он нужен: у API growtask нет CORS-заголовков, поэтому запрос из
// браузера с другого origin (localhost или github.io) блокируется, хотя
// сам endpoint отдаёт данные. Чтобы каталог отображался всегда, при ошибке
// запроса используем этот снимок (см. src/api/products.ts).
export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Аудиокассета',
    price: 490,
    old_price: 690,
    image: 'http://growtask.ru/assets/img/products/cassette.png',
    sku: 'RT-CAS-001',
    quantity: 120,
  },
  {
    id: 2,
    name: 'Видеомагнитофон',
    price: 12990,
    old_price: 15990,
    image: 'http://growtask.ru/assets/img/products/multimedia.png',
    sku: 'RT-VCR-002',
    quantity: 0,
  },
  {
    id: 3,
    name: 'Кассетный плеер',
    price: 7490,
    old_price: null,
    image: 'http://growtask.ru/assets/img/products/player.png',
    sku: 'RT-PLR-003',
    quantity: 14,
  },
  {
    id: 4,
    name: 'Радиоприёмник',
    price: 3990,
    old_price: 4990,
    image: 'http://growtask.ru/assets/img/products/radio.png',
    sku: 'RT-RAD-004',
    quantity: 9,
  },
  {
    id: 5,
    name: 'Проигрыватель винила',
    price: 18990,
    old_price: null,
    image: 'http://growtask.ru/assets/img/products/record-player.png',
    sku: 'RT-VNL-005',
    quantity: 0,
  },
  {
    id: 6,
    name: 'Катушечный магнитофон',
    price: 24990,
    old_price: 29990,
    image: 'http://growtask.ru/assets/img/products/tape-recorder.png',
    sku: 'RT-TAP-006',
    quantity: 3,
  },
  {
    id: 7,
    name: 'Видеокамера',
    price: 15990,
    old_price: null,
    image: 'http://growtask.ru/assets/img/products/video-cam.png',
    sku: 'RT-CAM-007',
    quantity: 0,
  },
  {
    id: 8,
    name: 'Диктофон',
    price: 2490,
    old_price: 2990,
    image: 'http://growtask.ru/assets/img/products/voice-recorder.png',
    sku: 'RT-DCT-008',
    quantity: 27,
  },
];
