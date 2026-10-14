import { Navigate, Route, Routes } from 'react-router-dom';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SuccessPage } from './pages/SuccessPage';

// Корневой компонент: только маршрутизация.
// «/» и любой неизвестный путь ведут на корзину.
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cart" replace />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/cart" replace />} />
    </Routes>
  );
}
