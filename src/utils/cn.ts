// Склеивает классы, отбрасывая «ложные» значения.
// Удобно для условных className: cn(styles.a, active && styles.active).
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
