import type { ReactNode, SVGProps } from 'react';

// Единый набор иконок проекта. Все иконки рисуются в viewBox 24×24
// и наследуют цвет через currentColor — это позволяет менять их цвет из CSS.
export type IconName =
  | 'home'
  | 'cart'
  | 'trash'
  | 'minus'
  | 'plus'
  | 'check'
  | 'close'
  | 'info'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'card'
  | 'wallet'
  | 'phone'
  | 'mail';

const shapes: Record<IconName, ReactNode> = {
  // — навигация и действия —
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
      <path d="M2.5 3.5h2.2l2.4 11.4a1.6 1.6 0 0 0 1.6 1.3h8.2a1.6 1.6 0 0 0 1.6-1.3L20.5 7.5H6" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9.5 7V5h5v2" />
      <path d="M6.5 7l1 13h9l1-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4.5 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19.5 12h-15" />
      <path d="M10.5 6l-6 6 6 6" />
    </>
  ),
  'chevron-down': <path d="M6 9.5l6 6 6-6" />,
  'chevron-up': <path d="M6 14.5l6-6 6 6" />,
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h4" />
    </>
  ),
  wallet: (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="2.5" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  phone: (
    <path d="M6 3.5h2.8l1.4 3.8-1.9 1.4a12.5 12.5 0 0 0 6 6l1.4-1.9 3.8 1.4V18a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4 5.5a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, strokeWidth = 1.8, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {shapes[name]}
    </svg>
  );
}
